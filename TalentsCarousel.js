import React from 'react';
import PicTalent from './PicTalent';
import talentsCarouselContainer from './TalentsCarouselContainer';
import './TalentsCarousel.scss';

const defaultPic = 'data:image/png;base64,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';

class TalentsCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      labelTitle: props.labelTitle,
      talents: props.talents,
      talentsCopy: props.talents,
      activeIndex: 0,
      lastIndex: props.talents.length - 1,
      copyPointer: props.talents.length - 1,
      talentStyle: {},
      windowSize: {
        width: 0,
        height: 0,
      },
      talentSlideSize: {
        width: 0,
      },
      controls: {
        prevButton: null,
        nextButton: null,
      },
      visibleArea: null,
      talentSlides: null,
      preventClick: false,
      talentCarouselComponent: null,
    };

    // BIND METHODS
    this.goToPrevSlide = this.goToPrevSlide.bind(this);
    this.goToNextSlide = this.goToNextSlide.bind(this);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.setPrevButton = this.setPrevButton.bind(this);
    this.setNextButton = this.setNextButton.bind(this);
    this.setVisibleArea = this.setVisibleArea.bind(this);
    this.setTalentSlides = this.setTalentSlides.bind(this);
    this.setTalentCarouselComponent = this.setTalentCarouselComponent.bind(this);
    this.hasAtLeastOneTalent = this.hasAtLeastOneTalent.bind(this);
  }

  // COMPONENT ACTIONS
  goToPrevSlide(e) {
    e.preventDefault();
    if (this.state.preventClick) {
      return false;
    }

    this.setState({
      preventClick: true,
    }, () => {
      const index = this.state.activeIndex;
      const talentsLength = this.state.talents.length;

      // INFINITE LOOP
      if (index === 0) {
        const currentOffViewTalent = this.state.talents[this.state.copyPointer]; // select last element
        const newCopyPointer = this.state.copyPointer;

        // TODO: corregir a State no mutable
        this.setState(prevState => ({
          talents: [currentOffViewTalent, ...prevState.talents],
          copyPointer: newCopyPointer,
          activeIndex: 0, // Se queda en 0 pues no existe nada antes
          talentStyle: {
            width: `${((this.state.talents.length + 1) * 92)}px`, // Se agrega nueva width
            transform: `translate(${-92}px, 0px)`,
            transition: 'none',
          },
          preventClick: false,
        }), () => {
          setTimeout(() => {
            this.setState(prevState => ({
              talentStyle: {
                ...prevState.talentStyle,
                transform: `translate(${0}px, 0px)`,
                transition: 'transform .3s ease-out',
              },
              preventClick: false,
            }));
          }, 100);
        });
      } else if (index > 0) {
        const newIndex = index - 1;
        this.setState(prevState => ({
          activeIndex: newIndex,
          talentStyle: {
            ...prevState.talentStyle,
            width: `${(this.state.talents.length * 92)}px`,
            transform: `translate(-${(newIndex * 92)}px, 0px)`,
          },
          preventClick: false,
        }));
      }
    });
  }

  goToNextSlide(e) {
    e.preventDefault();
    if (this.state.preventClick) {
      return false;
    }

    this.setState({
      preventClick: true,
    }, () => {
      const lastIndex = this.state.activeIndex;
      let index = this.state.activeIndex;
      const talentsLength = this.state.talents.length - 1;

      // if (index === talentsLength) {
      //   index = -1;
      // }
      const newIndex = index += 1;

      if (newIndex > (talentsLength - this.state.lastIndex)) {
        // LOGIC FOR ADD INFINITE LOOP
        const currentOffViewTalent = this.state.talents[lastIndex];

        this.setState(prevState => ({
          talents: [...prevState.talents, currentOffViewTalent],
        }));
      }

      this.setState({
        activeIndex: index,
        talentStyle: {
          width: `${(this.state.talents.length * 92)}px`,
          transform: `translate(-${(index * 92)}px, 0px)`,
        },
        preventClick: false,
      });
    });
  }

  selectTalent(talent, name, provider) {
    this.props.onSelectTalent(talent, name, provider);
  }

  hasAtLeastOneTalent() {
    return this.state.talents.length > 0;
  }

  handleSizeChange() {
    if (this.hasAtLeastOneTalent() === false) {
      return;
    }
    // if (this.state.visibleArea.offsetWidth < this.state.talentSlides.offsetWidth) {
    if (this.state.visibleArea.offsetWidth <= this.state.talentsCopy.length * 92) {
      this.state.controls.prevButton.style.display = 'block';
      this.state.controls.nextButton.style.display = 'block';
      this.state.visibleArea.style.width = 'calc(100% - 92px)';
      // } else if ((this.state.visibleArea.offsetWidth) + 96 > this.state.talentSlides.offsetWidth) {
    } else if ((this.state.visibleArea.offsetWidth) + 92 > this.state.talentsCopy.length * 92) {
      this.state.controls.prevButton.style.display = 'none';
      this.state.controls.nextButton.style.display = 'none';
      this.state.visibleArea.style.width = 'calc(100%)';
      this.setState({
        transition: 'none',
        activeIndex: 0,
        talentStyle: {
          width: `${(this.state.talentsCopy.length * 92)}px`,
          transform: 'translate(0px, 0px)',
        },
        talents: this.state.talentsCopy,
      }, () => {
        this.setState({
          transition: 'transform .3s ease-out',
        });
      });
    }
  }

  // END COMPONENT ACTIONS

  // === INITIALIZERS
  setPrevButton(element) {
    this.state.controls.prevButton = element;
  }

  setNextButton(element) {
    this.state.controls.nextButton = element;
  }

  setVisibleArea(element) {
    this.state.visibleArea = element;
  }

  setTalentSlides(element) {
    this.state.talentSlides = element;
  }

  setTalentCarouselComponent(element) {
    this.state.talentCarouselComponent = element;
  }

  setTalentSlidesWidth() {
    this.setState({
      talentSlideSize: {
        width: `${(this.state.talents.length * 92)}px`,
      },
      talentStyle: {
        width: `${(this.state.talents.length * 92)}px`, // remove plus when remove test border
      },
    });
  }

  // === END INITIALIZERS

  // ==== LISTENERS
  updateWindowDimensions() {
    this.setState({
      windowSize: {
        width: window.innerWidth,
        height: window.innerHeight,
      },
    }, () => {
      this.handleSizeChange();
    });
  }

  componentWillMount() {
    this.updateWindowDimensions();
    this.setTalentSlidesWidth();
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.addEventListener('resize', this.updateWindowDimensions);
  }


  render() {
    return (
      this.hasAtLeastOneTalent() ?
        <div className={'otro'}>
          <h2>{this.state.labelTitle}</h2>
          <div className={'talent-carousel-component'} ref={this.setTalentCarouselComponent}>
            <div
              className='prev-button' onClick={e => this.goToPrevSlide(e)}
              ref={this.setPrevButton}
            >
              <i className={'fa fa-chevron-left fa-2x'}/>
            </div>
            <div className={'visible-area'} ref={this.setVisibleArea}>
              <div
                className={'talent-slides'} ref={this.setTalentSlides}
                style={this.state.talentStyle}
              >
                {
                  this.state.talents.map((talent, index) => (<PicTalent
                    defaultPic={defaultPic}
                    key={index}
                    talent={talent}
                    activeIndex={this.state.activeIndex}
                    actions={this.props.talentsCarouselActions}
                    handleClick={(e) => { this.selectTalent(talent.id, talent.name, talent.provider, e); }}
                  />))
                }
              </div>
            </div>
            <div
              className={'next-button'} onClick={e => this.goToNextSlide(e)}
              ref={this.setNextButton}
            >
              <i className={'fa fa-chevron-right fa-2x'}/>
            </div>
          </div>
        </div> : null);
  }
}

TalentsCarousel.propTypes = {
  talents: React.PropTypes.array,
  onSelectTalent: React.PropTypes.func,
  labelTitle: React.PropTypes.string,
  talentsCarouselActions: React.PropTypes.object,
};

// High Order Component to filter Data
const TalentsCarouselContainer = talentsCarouselContainer(TalentsCarousel);
export default TalentsCarouselContainer;
