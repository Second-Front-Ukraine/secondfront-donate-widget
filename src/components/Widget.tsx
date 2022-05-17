import React, { useState, useEffect } from 'react';
import internal from 'stream';
import DonateForm from './DonateForm';
import { wave } from '../axiosInstances';

export interface WidgetProps {
    campaign: string;
}

interface Campaign {
    slug: string,
    collected: number,
}

interface Tab {
    url: string,
    tabId: string,
}

function Widget(props: WidgetProps) {
    const [campaignData, setCampaignData] = useState({
        slug: props.campaign,
        collected: 0
    } as Campaign);
    const [tab, setTab] = useState(undefined as Tab | undefined);

    const openPaymentForm = () => {
        if (tab) {
            window.open(tab.url, "", "width=1024, height=768");
        }
    }

    const onTabCreated = (tab: Tab) => {
        setTab(tab);
        localStorage.setItem(`tab-in-progress-${props.campaign}`, JSON.stringify(tab));
        openPaymentForm();
    }

    const onDonationCancel = () => {
        setTab(undefined);
    }

    useEffect(() => {

        // Load Campaign details
        wave.get(`/campaign/${props.campaign}`).then((result) => {
            console.log(result);
            setCampaignData(result.data.campaign);
        })

        // Check local storage for existing donation Tab
        const items = localStorage.getItem(`tab-in-progress-${props.campaign}`);
        if (items) {
            setTab(JSON.parse(items));
        }
    }, [])

    return (
        <div className="sfua-widget">
            {tab ? (
                <div>Processing <a href="#" onClick={openPaymentForm}>your donation</a> in another window. <br /><a href="#" onClick={onDonationCancel}>Click here to cancel</a>.</div>
            ) : (
                <div>
                    Collected to date <strong>${campaignData.collected / 100}</strong>
                    <DonateForm campaign={props.campaign} onTabCreated={onTabCreated} />
                </div>
            )}
        </div>
    );
}

export default Widget;
