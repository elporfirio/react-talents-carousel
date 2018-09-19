import React from 'react';
import map from 'lodash/map';
import { converter } from 'helpers/converter';

const talentsCarouselContainer = (WrappedTalentsCarousel) => {
  class HOC extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        labelTitle: props.labelTitle,
        content: props.content,
        talentsCarouselActions: props.talentsCarouselActions,
        metadataProvider: props.metadataProvider,
        metadata: props.metadata,
        translations: JSON.parse(props.metadata.translations).language[localStorage.getItem('loginInfo.region')],
      };
    }

    generateTalentRoleId(id) {
      let cid = id;
      if (cid < 0) {
        cid *= -1;
      }
      return `talent_role_id${cid}`;
    }

    gracenoteCastToTalents(cast) {
      const talents = map(cast, (caster) => {
        const formattedCast = map(caster.talents, talent => ({
          id: talent.id,
          name: `${talent.first_name} ${talent.last_name}`,
          image: talent.image,
          role: converter.convertApaUnicode(this.state.translations, `${this.generateTalentRoleId(caster.role_id)}`, caster.role_name),
          role_id: caster.role_id,
          provider: 'gracenote',
        }));

        return formattedCast;
      })
      .reduce((lastVal, current) => lastVal.concat(current), []);

      return talents;
    }

    gracenoteTalentsOrder(talents, provider, rolePriority) {
      if (rolePriority.length === 0) {
        return talents;
      }

      let orderedTalents;

      const sorter = (array, order, key) => {
        const result = array.sort((a, b) => {
          const A = a[key];
          const B = b[key];

          if (order.indexOf(A) > order.indexOf(B)) {
            return 1;
          }
          return -1;
        });
        return result;
      };

      switch (provider) {
        case 'gracenote':
          orderedTalents = sorter(talents, rolePriority.gracenote, 'role_id');
          break;
        case 'amco':
        default:
          orderedTalents = sorter(talents, rolePriority.default, 'role_id');
          break;
      }

      if (orderedTalents === undefined) {
        orderedTalents = this.gracenoteTalentsOrder(talents, 'amco', rolePriority);
      }

      return orderedTalents;
    }

    filterTalents(talents, provider, rolePriority) {
      if (rolePriority.length === 0) {
        return talents;
      }

      let result;

      const filterByOrder = (array, order, key) =>
        array.filter(talent => (order.indexOf(talent[key]) !== -1));

      switch (provider) {
        case 'gracenote':
          result = filterByOrder(talents, rolePriority.gracenote, 'role_id');
          break;
        case 'amco':
        default:
          result = filterByOrder(talents, rolePriority.default, 'role_id');
          break;
      }

      if (result.length === 0 && provider !== 'amco') {
        result = this.filterTalents(talents, 'amco', rolePriority);
      }

      return result;
    }

    amcoRolesToTalents(roles) {
      const talents = map(roles.role, (rol) => {
        const cast = map(rol.talents.talent, talent => ({
          id: talent.id,
          name: `${talent.name} ${talent.surname}`,
          image: talent.image || '',
          role: converter.convertApaUnicode(this.state.translations, `${this.generateTalentRoleId(rol.id)}`, rol.desc),
          role_id: rol.id,
          provider: 'amco',
        }));

        return cast;
      })
      .reduce((lastVal, current) => lastVal.concat(current), []);

      return talents;
    }

    defineTalents(metadata, provider) {
      let talents;

      switch (provider) {
        case 'gracenote':
          if (metadata.group && metadata.group.external) {
            talents = this.gracenoteCastToTalents(metadata.group.external.gracenote.cast);
          }
          break;
        case 'amco':
        default:
          if (metadata.group && metadata.group.common) {
            talents = this.amcoRolesToTalents(metadata.group.common.extendedcommon.roles);
          }
          break;
      }

      if (talents === undefined) {
        talents = this.defineTalents(metadata, 'amco');
      }

      return talents;
    }

    render() {
      const talents = this.defineTalents(this.state.content, this.state.metadataProvider);
      let priorityOrderArray = [];
      if (this.props.metadata.talent_role_priority !== undefined) {
        priorityOrderArray = (typeof this.props.metadata.talent_role_priority === 'string') ?
          JSON.parse(this.props.metadata.talent_role_priority) :
          this.props.metadata.talent_role_priority;
      }

      const talentsOrdered = this.gracenoteTalentsOrder(talents,
        this.state.metadataProvider,
        priorityOrderArray);

      const talentsFiltered = this.filterTalents(talentsOrdered,
        this.state.metadataProvider,
        priorityOrderArray);

      return (
        <WrappedTalentsCarousel
          labelTitle={this.state.labelTitle}
          talents={talentsFiltered}
          talentsCarouselActions={this.state.talentsCarouselActions}
          actions={this.props.actions}
        />
      );
    }
  }

  HOC.propTypes = {
    labelTitle: React.PropTypes.string,
    content: React.PropTypes.any,
    talentsCarouselActions: React.PropTypes.object,
    metadataProvider: React.PropTypes.string,
    metadata: React.PropTypes.any,
    actions: React.PropTypes.any,
  };

  return HOC;
};

export default talentsCarouselContainer;
