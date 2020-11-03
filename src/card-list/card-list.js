import React, { Component } from 'react'

import CardComponent from '../card/card'
import { Toast } from 'primereact/toast' 
import './card-list.css'

//The CardList component shows nothing when it mounts for the first time.
//But right before it mounts on to the DOM, it creates cards based on config given
//then displays them using the Card Component
export default class CardList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            buttonFirstContainerText: 'Select',
            buttonSecondContainerText: 'Select',
            showFirstContainerCheckBox: false,
            showSecondContainerCheckBox: false,
            selectedCardIds: [],
            currentSelectedCardText: '',
            currentSelectedCardId: '',
            cardsConfig : {
                firstContainerCardsCount : 100,
                secondContainerCardsCount : 50
            }
        }
    }

    // cardButtonClicked method is used to change the content of the app once button clicked in card button 
    cardButtonClicked = (element) => {
        const buttonElement = element.currentTarget ? element.currentTarget : element.target.parentElement ? element.target.parentElement : ''
        if(buttonElement && buttonElement.id && buttonElement.innerText && buttonElement.innerText === 'Select') {
            if((buttonElement.id).split('-')[0] === 'firstContainer') {
                this.setState((prevState)=>({
                    ...prevState,
                    currentSelectedCardId: buttonElement.id,
                    currentSelectedCardText: buttonElement.innerText,
                    showFirstContainerCheckBox: true,
                    selectedCardIds: [(buttonElement.id),...prevState.selectedCardIds]
                }))
            } else if((buttonElement.id).split('-')[0] === 'secondContainer') {
                this.setState((prevState)=>({
                    ...prevState,
                    currentSelectedCardText: buttonElement.innerText,
                    currentSelectedCardId: buttonElement.id,
                    showSecondContainerCheckBox: true,
                    selectedCardIds: [(buttonElement.id),...prevState.selectedCardIds]
                }))
            }
        } else if(buttonElement && buttonElement.id && buttonElement.innerText && buttonElement.innerText === 'Done') {
            let container = document.querySelector("#first-container-dev");
            let checkBoxesSelected = container.querySelectorAll('input[type="checkbox"]:checked');
            let selectedCards = [];
            for(let card in checkBoxesSelected) {
                if(checkBoxesSelected[card].id) {
                    selectedCards.push(checkBoxesSelected[card].id)
                }
            }
            if((buttonElement.id).split('-')[0] === 'firstContainer') {
                this.setState((prevState)=>({
                    ...prevState,
                    showFirstContainerCheckBox: true,
                    currentSelectedCardText: buttonElement.innerText,
                    currentSelectedCardId: buttonElement.id,
                    selectedCardIds : prevState.selectedCardIds.filter((card) => {
                        return card !== buttonElement.id
                      })
                }))
                this.toast.show({closable: true, severity: 'success', content: (
                    <div className="p-flex p-flex-column" style={{flex: '1'}}>
                        <div className="p-text-center">
                            <i className="pi pi-exclamation-triangle" style={{fontSize: '3rem'}}></i>
                            <h4>First Container Cards Selected</h4>
                        </div>
                        <div>{selectedCards.join(',')}</div>
                    </div>
                )})
            } else if((buttonElement.id).split('-')[0] === 'secondContainer') {
                let container = document.querySelector("#second-container-dev");
                let checkBoxesSelected = container.querySelectorAll('input[type="checkbox"]:checked');
                let selectedCards = [];
                for(let card in checkBoxesSelected) {
                    if(checkBoxesSelected[card].id) {
                        selectedCards.push(checkBoxesSelected[card].id)
                    }
                }
                this.setState((prevState)=>({
                    ...prevState,
                    showSecondContainerCheckBox: true,
                    currentSelectedCardText: buttonElement.innerText,
                    currentSelectedCardId: buttonElement.id,
                    selectedCardIds : prevState.selectedCardIds.filter((card) => {
                        return card !== buttonElement.id
                      })
                }))
                this.toast.show({closable: true, severity: 'success', content: (
                    <div className="p-flex p-flex-column" style={{flex: '1'}}>
                        <div className="p-text-center">
                            <i className="pi pi-exclamation-triangle" style={{fontSize: '3rem'}}></i>
                            <h4>Second Container Cards Selected</h4>
                        </div>
                        <div>{selectedCards.join(',')}</div>
                    </div>
                )})
            }
        }

        this.setState((prevState)=>({
            ...prevState,
            selectedCardIds: [...new Set(prevState.selectedCardIds)],
        }))
    }

    // cardComp method is used to create the card component
    cardComp = (count,container, buttonText='Select', showCheckBox, selectedCardIds, currentSelectedCardText, currentSelectedCardId) => {
        let cardArray = []
        for(let index = 1; index<=count; index++) {
            cardArray.push(
                <CardComponent setCheckBoxVal={this.setCheckBoxVal} currentSelectedCardId={currentSelectedCardId} currentSelectedCardText= {currentSelectedCardText} selectedCardIds={selectedCardIds} key={index} cardButtonClicked={this.cardButtonClicked} buttonText={buttonText} checkBoxId={`${container}-${index}`} showCheckBox={showCheckBox} />
            )
        }
        return cardArray
    }

    // render method is used to render the component View 
    render() {
        const {cardsConfig, currentSelectedCardId, buttonFirstContainerText, buttonSecondContainerText, showFirstContainerCheckBox, showSecondContainerCheckBox, selectedCardIds, currentSelectedCardText } = this.state
        return (
            <div>
                <div className="p-d-flex p-flex-row">
                    <div id="first-container-dev" className="p-col-12 p-md-6 p-lg-6 cardListAbvDiv">
                    {this.cardComp(cardsConfig.firstContainerCardsCount,'firstContainer',buttonFirstContainerText, showFirstContainerCheckBox, selectedCardIds, currentSelectedCardText, currentSelectedCardId )}
                    </div>
                    <div id="second-container-dev" className="p-col-12 p-md-6 p-lg-6 cardListAbvDiv">
                        {this.cardComp(cardsConfig.secondContainerCardsCount,'secondContainer', buttonSecondContainerText, showSecondContainerCheckBox, selectedCardIds, currentSelectedCardText, currentSelectedCardId )}
                    </div>
                </div>
                <Toast ref={(el) => this.toast = el} />
            </div>
        )
    }
}