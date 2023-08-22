import React, { useState, useEffect } from 'react';
import { wave } from '../axiosInstances';
import { StackedTextAmountSelector, StackedBoxAmountSelector } from './AmountSelector';

export const CITIES = Object.freeze({
    TORONTO: {
      code: 'TORONTO',
      name: 'Toronto, Canada',
      country: 'CA',
      province: 'CA-ON',
    },
    VANCOUVER: {
      code: 'VANCOUVER',
      name: 'Vancouver, Canada',
      country: 'CA',
      province: 'CA-BC',
    },
    MONTREAL: {
      code: 'MONTREAL',
      name: 'Montreal, Canada',
      country: 'CA',
      province: 'CA-QC',
    },
    LONDON: {
      code: 'LONDON',
      name: 'London, United Kingdom',
      country: 'GB',
      province: 'GB-LND',
    },
    TELAVIV: {
      code: 'TELAVIV',
      name: 'Tel-Aviv, Israel',
      country: 'IL',
      province: 'IL-TA'
    },
    CALPE: {
      code: 'CALPE',
      name: 'Calpe, Spain',
      country: 'ES',
      province: 'ES-VC',
    },
});
const REGISTRATION_PRODUCT_ID = "QnVzaW5lc3M6YWU4YTgxYjYtZWI4OS00MDRhLWExNzgtYzJmYmM4OTc2ODIzO1Byb2R1Y3Q6ODIxNjg1MDQ="

export interface RegisterFormProps {
    campaign: string;
    onTabCreated: (tab: any) => void;
    useBoxSelector?: boolean;
    enterRaffle?: boolean;
}

function RegisterForm(props: RegisterFormProps) {
    const [amount, setAmount] = useState("20");
    const [email, setEmail] = useState("");
    const [fullName, setFullname] = useState("");
    const [memo, setMemo] = useState("");
    const [addressCity, setAddressCity] = useState("");
    const [addNote, setAddNote] = useState(false);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const city: {name: string, country: string, province: string} = CITIES[addressCity as keyof typeof CITIES];
        const inputData = {
            campaign_slug: props.campaign,
            // amount: parseInt((Number(amount) * 100).toString()),
            email,
            name: fullName,
            comment: memo,
            shipping_details: {
              'addressLine1': '',
              'addressLine2': '',
              'city': city.name,
              'provinceCode': '',  // Having issues with API accepting some provinces (in particular Mexico and Singapore). So far it is believed an issue with Wave backend.
              'countryCode': city.country,
              'postalCode': '',
              'phone': '',
            },
            products: {
              [REGISTRATION_PRODUCT_ID]: {
                'quantity': 1,
                'unitPrice': parseInt((Number(amount) * 100).toString()),
              },
            }
        };
        // https://stackoverflow.com/a/39387533
        var windowReference = window.open("", "", "width=1024, height=768");
        wave.post("/tab", inputData).then((result: any) => {
            props.onTabCreated(result.data);
            if (!!result.data.url && windowReference) {
                windowReference.location = result.data.url;
            }
        })
    }

    const handleAddNote = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        setAddNote(true);
    }

    const isValid = !!amount && parseInt(amount) >= 20 && email && fullName && addressCity;

    return (
        <div className="sfua-donate-form">
            {props.useBoxSelector ? (
                <StackedBoxAmountSelector onSelect={(amount: number) => setAmount(amount.toString())} promptText='Select your registration gift. Minimum donation to register is $20' />
            ) : (
                <StackedTextAmountSelector onSelect={(amount: number) => setAmount(amount.toString())} />
            )}
            <form onSubmit={handleSubmit}>
                <div className="sfua-donate-form__input-box">
                    <span className="sfua-donate-form__input-box__prefix">CAD</span>
                    <input
                        type="number"
                        name="amount"
                        value={amount}
                        min={20}
                        className='sfua-donate-form__input-box__large'
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Enter amount"
                    />
                </div>
                {props.enterRaffle ? (
                    <p className="sfua-donate-enter-raffle">🇺🇦 Please add your email address for a chance to <strong>win the National Flag of Ukraine signed by Valerii Zaluzhnyi</strong>, Commander-in-Chief of the Armed Forces of Ukraine.</p>
                ) : null}
                <div className="sfua-donate-form__input-box">
                    <input
                        type="text"
                        name="email"
                        value={email}
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="sfua-donate-form__input-box">
                    <input
                        type="text"
                        name="fullName"
                        value={fullName}
                        placeholder="Full name"
                        onChange={(e) => setFullname(e.target.value)}
                    />
                </div>
                <div className="sfua-donate-form__input-box">
                    <label className='sfua-donate-form__input-box__prefix' htmlFor="register-address-city">City: </label>
                    <select
                    className="custom-select"
                    id="register-address-city"
                    value={addressCity}
                    placeholder={"City"}
                    onChange={(e) => setAddressCity(e.target.value)}
                    >
                    <option selected={!addressCity} value=''></option>
                    {Object.entries(CITIES as { [code: string]: { country: string, name: string } }).map(
                        ([code, city], i) => {
                        return <option selected={addressCity === code} value={code}>{city.name}</option>;
                        })}
                    </select>
                </div>
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
                {!addNote ? (
                    <div className='sfua-donate-form__add'>
                        <a href="#" onClick={handleAddNote}>Add a note</a>
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
                        {isValid ? (
                            <input type="submit" value="Register" />
                        ) : <input type="submit" value="Register" disabled/>}
                    </div>
                </div>
            </form>
        </div>
    );
}

export default RegisterForm;
