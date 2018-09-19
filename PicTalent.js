import React from 'react';

function PicTalent({ talent, defaultPic, actions }) {
  return (
    <div className={'pic-talent-component'} onClick={() => { actions.onSelectTalent(talent); }}>
      <div
        className={'avatar'}
        style={{ backgroundImage: `url(${(talent.image !== '') ? talent.image : defaultPic})` }}/>

      <span className={'talent-name'}>{talent.name}</span>
      <span className={'talent-role'}>{talent.role}</span>
    </div>
  );
}

PicTalent.propTypes = {
  talent: React.PropTypes.shape({
    image: React.PropTypes.string,
    name: React.PropTypes.string.isRequired,
    role: React.PropTypes.string.isRequired,
  }),
  defaultPic: React.PropTypes.string.isRequired,
  actions: React.PropTypes.object,
};

export default PicTalent;
