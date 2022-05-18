import React, { useState, useEffect, useRef } from 'react';
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
    tab_id: string,
    paid: boolean,
}

function Widget(props: WidgetProps) {
    const [campaignData, setCampaignData] = useState({
        slug: props.campaign,
        collected: 0
    } as Campaign);
    const [tab, setTab] = useState(undefined as Tab | undefined);
    const breakPoll = useRef(false);

    const openPaymentForm = (tabToOpen: Tab) => {
        window.open(tabToOpen.url, "", "width=1024, height=768");
    }

    const pollForPayment = (tabAsArgument?: Tab, counter = 1) => {
        wave.get(`/tab/${tabAsArgument?.tab_id}`).then(result => {
            if (!result.data.paid && counter <= 120) {
                if (!breakPoll.current) {
                    setTimeout(() => pollForPayment(tabAsArgument, counter + 1), 5000);
                } else {
                    breakPoll.current = false;
                }
            } else {
                setTab(result.data);
                fetchCampaign();
            }
        });
    }

    const onTabCreated = (tab: Tab) => {
        setTab(tab);
        localStorage.setItem(`tab-in-progress-${props.campaign}`, JSON.stringify(tab));
        openPaymentForm(tab);
        pollForPayment(tab);
    }

    const onDonationCancel = () => {
        setTab(undefined);
        breakPoll.current = true;
    }

    const fetchCampaign = () => {
        wave.get(`/campaign/${props.campaign}`).then((result) => {
            setCampaignData(result.data.campaign);
        });
    }

    useEffect(() => {
        // Load Campaign details
        fetchCampaign();

        // Check local storage for existing donation Tab
        const items = localStorage.getItem(`tab-in-progress-${props.campaign}`);
        if (items) {
            const parsedTab: Tab = JSON.parse(items)
            setTab(parsedTab);
            pollForPayment(parsedTab);
        }
    }, [])

    return (
        <div className="sfua-widget">
            <p>Collected to date <strong>${campaignData.collected / 100}</strong></p>
            {tab ? tab.paid ? (
                <div>
                    <p>Thank you for supporting Ukrainians! <br />💙&nbsp;💛 <br /><a href="#" onClick={onDonationCancel}>Click here to make another contribution</a></p>
                </div>
            ) : (
                <div>
                    <p>Processing <a href="#" onClick={() => openPaymentForm(tab)}>your donation</a> in another window. <br /><a href="#" onClick={onDonationCancel}>Click here to cancel</a>.
                    </p>
                </div>
            ) : (
                <div>
                    <DonateForm campaign={props.campaign} onTabCreated={onTabCreated} />
                </div>
            )}
        </div>
    );
}

export default Widget;
