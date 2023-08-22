import React, { useState, useEffect } from 'react';
import internal from 'stream';
import { wave } from '../axiosInstances';
import { StackedTextAmountSelector, StackedBoxAmountSelector } from './AmountSelector';

export interface DonateFormProps {
    campaign: string;
    onTabCreated: (tab: any) => void;
    useBoxSelector?: boolean;
    enterRaffle?: boolean;
}

function DonateForm(props: DonateFormProps) {
    const [amount, setAmount] = useState("");
    const [email, setEmail] = useState("");
    const [fullName, setFullname] = useState("");
    const [memo, setMemo] = useState("");
    const [addNote, setAddNote] = useState(false);
    const [addIdentity, setAddIdentity] = useState(!!props.enterRaffle);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const inputData = {
            campaign_slug: props.campaign,
            amount: parseInt((Number(amount) * 100).toString()),
            email,
            name: fullName,
            comment: memo,
            referrer: window.location.href,
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

    return (
        <div className="sfua-donate-form">
        {props.useBoxSelector ? (
            <StackedBoxAmountSelector onSelect={(amount: number) => setAmount(amount.toString())}/>
        ): (
            <StackedTextAmountSelector onSelect={(amount: number) => setAmount(amount.toString())}/>
        )}
            <form onSubmit={handleSubmit}>
                <div className="sfua-donate-form__input-box">
                    <span className="sfua-donate-form__input-box__prefix">CAD</span>
                    <input
                        type="number"
                        name="amount"
                        value={amount}
                        className='sfua-donate-form__input-box__large'
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Enter amount"
                    />
                </div>
                {props.enterRaffle ? (
                    <p className="sfua-donate-enter-raffle">🇺🇦 Please add your email address for a chance to <strong>win the National Flag of Ukraine signed by Valerii Zaluzhnyi</strong>, Commander-in-Chief of the Armed Forces of Ukraine.</p>
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
