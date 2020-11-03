import React, { Component } from 'react'
import { Card } from 'primereact/card'
import { Button } from 'primereact/button'
import { Checkbox } from 'primereact/checkbox'

import cardCss from './card.module.css'

//The CardComponent component shows individual card details
class CardComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            checked: false,
        };
       let preCompletedCardId = ''
    }

    // setCheckBoxVal used to update checkbox checked state
    setCheckBoxVal = (event) => {
        this.setState({
            ...this.state,
            checked: event.target.checked
        })
    }

    // componentDidUpdate used to update the state & props if the component
    componentDidUpdate(prevProps, prevState) {
        this.preCompletedCardId = prevProps.currentSelectedCardId
    }

    // render method is used to render the component View 
    render() {
        const {  showCheckBox, checkBoxId, currentSelectedCardText, currentSelectedCardId } = this.props
        let{ buttonText, selectedCardIds } = this.props
        const id = checkBoxId ? checkBoxId.split('-')[1] : ''
        let footer = ''
        const header = <h2>Card {`${id}`}</h2>
        let cardCompleted = false
        if(this.preCompletedCardId && checkBoxId === this.preCompletedCardId) {
            cardCompleted = true
        } else {
            cardCompleted = false
        }
        if((selectedCardIds && selectedCardIds.indexOf(checkBoxId) !== -1)) {
            buttonText = 'Done'
        } else {
            buttonText = 'Select'
        }
        if (showCheckBox && ((checkBoxId !== currentSelectedCardId) || currentSelectedCardText === 'Select') ) {
            if((currentSelectedCardText === 'Select' || this.state.checked)&& !cardCompleted) {
                footer = (
                    <div>
                        <Button label={`${buttonText}`} id={`${checkBoxId}`} className={cardCss.cardButton} onClick={this.props.cardButtonClicked} />
                        <Checkbox inputId={`card ${id}`} id={`checkbox-${checkBoxId}`} value={`card ${id}`} className={cardCss.cardCheckBox} onChange={this.setCheckBoxVal} checked={this.state.checked}></Checkbox>
                    </div>
                )
            } else if(currentSelectedCardText === 'Done' && !this.state.checked && !cardCompleted) {
                footer = (
                    <div>
                        <Button label={`${buttonText}`} id={`${checkBoxId}`} className={cardCss.cardButton} onClick={this.props.cardButtonClicked} />
                        <Checkbox inputId={`card ${id}`} id={`checkbox-${checkBoxId}`} value={`card ${id}`} className={cardCss.cardCheckBox} onChange={this.setCheckBoxVal} checked={this.state.checked}></Checkbox>
                    </div>
                )
            } else {
                footer = (
                    <div>
                        <Button label={`${buttonText}`} id={`${checkBoxId}`} className={cardCss.cardButton} onClick={this.props.cardButtonClicked} />
                    </div>
                )
            }
        } else {
            if(currentSelectedCardText === 'Done' && (checkBoxId === currentSelectedCardId)) {
                footer = (
                    <div>
                        <Button label={`${buttonText}`} id={`${checkBoxId}`} className={cardCss.cardButton} onClick={this.props.cardButtonClicked} />
                    </div>
                )
            } else if(currentSelectedCardText === 'Done' && this.state.checked) {
                footer = (
                    <div>
                        <Button label={`${buttonText}`} id={`${checkBoxId}`} className={cardCss.cardButton} onClick={this.props.cardButtonClicked} />
                        <Checkbox inputId={`card ${id}`} id={`checkbox-${checkBoxId}`} value={`card ${id}`} className={cardCss.cardCheckBox} onChange={this.setCheckBoxVal} checked={this.state.checked}></Checkbox>
                    </div>
                )
            } else {
                footer = (
                    <div>
                        <Button label={`${buttonText}`} id={`${checkBoxId}`} className={cardCss.cardButton} onClick={this.props.cardButtonClicked} />
                    </div>
                )
            }
        }
        return (
            <Card className={cardCss.cardDiv} footer={footer} header={header}></Card>
        )
    }
}

export default CardComponent