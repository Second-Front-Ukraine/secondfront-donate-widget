import React from 'react';


export interface AmountSelectorProps {
    onSelect: (amount: number) => void;
}

export function StackedBoxAmountSelector(props: AmountSelectorProps) {
    return (
        <div className="sfua-donate-subheader">
            <h3>Select amount to donate</h3>
            <div className="sfua-donate-amount-selector">
                <button onClick={() => props.onSelect(25.00)}>$25</button>
                <button onClick={() => props.onSelect(50.00)}>$50</button>
                <button onClick={() => props.onSelect(100.00)}>$100</button>
                <button onClick={() => props.onSelect(200.00)}>$200</button>
            </div>
        </div>
    )
}

export function StackedTextAmountSelector(props: AmountSelectorProps) {
    const amountOptions = [25.00, null, 50.00, null, 100.00, null, 200.00].map(amount => {
        if (!amount) {
            return ' | '
        }
        const onClickHandler = (e: React.MouseEvent<HTMLAnchorElement>) => {
            e.preventDefault();
            props.onSelect(amount);
        }
        return (
            <a href="#" onClick={onClickHandler} key={`option-${amount}`}>${amount.toLocaleString('en-CA')}</a>
        )
    });
    return (
        <div className='sfua-donate-form__amount-select'>
            <span>{amountOptions}</span>
        </div>
    )
}
