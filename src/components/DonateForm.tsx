import React, { useState, useEffect } from 'react';
import internal from 'stream';
import { wave } from '../axiosInstances';

export interface DonateFormProps {
    campaign: string;
    onTabCreated: (tab: any) => void,
}

function DonateForm(props: DonateFormProps) {
    const [amount, setAmount] = useState("");
    const [email, setEmail] = useState("");
    const [fullName, setFullname] = useState("");
    const [memo, setMemo] = useState("");
    const [addNote, setAddNote] = useState(false);
    const [addIdentity, setAddIdentity] = useState(false);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const inputData = {
            campaign_slug: props.campaign,
            amount: parseInt((Number(amount) * 100).toString()),
            email,
            name: fullName,
            comment: memo,
        };
        wave.post("/tab", inputData).then((result) => {
            props.onTabCreated(result.data);
        })
    }

    const handleAddIdentity = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        setAddIdentity(true);
    }

    const handleAddNote = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        setAddNote(true);
    }

    const amountOptions = [25.00, null, 50.00, null, 100.00, null, 200.00].map(amount => {
        if (!amount) {
            return ' | '
        }
        const onClickHandler = (e: React.MouseEvent<HTMLAnchorElement>) => {
            e.preventDefault();
            setAmount(amount.toString());
        }
        return (
            <a href="#" onClick={onClickHandler} key={`option-${amount}`}>${amount.toLocaleString('en-CA')}</a>
        )
    });


    return (
        <div className="2fua-donate-form">
            <div className='sfua-donate-form__amount-select'>
                <span>{amountOptions}</span>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="sfua-donate-form__input-box">
                    <span className="sfua-donate-form__input-box__prefix">CAD</span>
                    <input
                        type="number"
                        name="amount"
                        value={amount}
                        className='sfua-donate-form__input-box__large'
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </div>
                {!addIdentity || !addNote ? (
                    <div className='sfua-donate-form__add'>
                        {!addIdentity ? (
                            <a href="#" onClick={handleAddIdentity}>Include email to receive updates</a>
                        ) : null}
                        {addIdentity === addNote ? (" | ") : null}
                        {!addNote ? (
                            <a href="#" onClick={handleAddNote}>Add a note</a>
                        ) : null}
                    </div>
                ) : null}
                {addIdentity ? (
                    <div className="sfua-donate-form__input-box">
                        <input
                            type="text"
                            name="email"
                            value={email}
                            placeholder="Email (optional)"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                ) : null}
                {addIdentity ? (
                    <div className="sfua-donate-form__input-box">
                        <input
                            type="text"
                            name="fullName"
                            value={fullName}
                            placeholder="Full name (optional)"
                            onChange={(e) => setFullname(e.target.value)}
                        />
                    </div>
                ) : (
                    null
                )}
                {addNote ? (
                    <div className="sfua-donate-form__input-box">
                        <textarea
                            name="memo"
                            value={memo}
                            placeholder="Note (optional)"
                            rows={7}
                            onChange={(e) => setMemo(e.target.value)}
                        />
                    </div>
                ) : null}
                <div>
                    <div className="invoice-insights__payments-banner">
                        <div className="icon-override wv-icon--payment-method--small wv-icon--payment-method--bank-payment"></div>
                        <div className="icon-override wv-icon--payment-method--small wv-icon--payment-method--cc-amex"></div>
                        <div className="icon-override wv-icon--payment-method--small wv-icon--payment-method--cc-mastercard"></div>
                        <div className="icon-override wv-icon--payment-method--small wv-icon--payment-method--cc-visa"></div>
                    </div>
                    <div className='sfua-donate-form__submit-alt'>
                        <input type="submit" value="Donate" />
                    </div>
                </div>
            </form>
        </div>
    );
}

export default DonateForm;
