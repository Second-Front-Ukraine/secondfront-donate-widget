import React, { useState, useEffect, useRef } from 'react';
import logo from './logo.svg';
import './widgetRunForUkraineRunReg.css';
import RegisterForm from './components/RegisterForm';
import { wave } from './axiosInstances';
import Widget from './components/Widget';
import { Campaign, Tab } from './types';
import { StackedBoxAmountSelector } from './components/AmountSelector';

export interface AppProps {
    campaign: string;
    targetCollections: number;
}


function WidgetRunForUkraineRunReg(props: AppProps) {
    const [campaignData, setCampaignData] = useState({
        slug: props.campaign,
        collected: 0
    } as Campaign);
    const [tab, setTab] = useState(undefined as Tab | undefined);
    const breakPoll = useRef(false);
    const today = new Date().toISOString().slice(0, 10);

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
        localStorage.setItem(`tab-in-progress-${props.campaign}-${today}`, JSON.stringify(tab));
        openPaymentForm(tab);
        pollForPayment(tab);
    }

    const handleDonationCancel = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
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
        const items = localStorage.getItem(`tab-in-progress-${props.campaign}-${today}`);
        if (items) {
            const parsedTab: Tab = JSON.parse(items)
            setTab(parsedTab);
            pollForPayment(parsedTab);
        }
    }, [])

    const handleClickDonation = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        if (tab) {
            openPaymentForm(tab);
        }
    }

  return (
    <div className="App">
      <div className="sfua-widget">
        <div className="sfua-widget-progress-container">
            <h2>Goal <br/><span className="sfua-widget-header-goal">CAD $69,920</span>
            </h2>
            <div>
                <p>Raised <br/><strong>${(campaignData.collected / 100).toLocaleString('en-CA')}</strong></p>
                <p>Goal <br/><strong>${props.targetCollections.toLocaleString('en-CA')}</strong></p>
            </div>
            <progress max={props.targetCollections} value={campaignData.collected / 100}></progress>
        </div>
          {tab ? tab.paid ? (
              <div className="sfua-widget-tab-container">
                  <p>Thank you for supporting Ukraine! <br />💙&nbsp;💛 <br /><a href="#" onClick={handleDonationCancel}>Click here to make another contribution</a></p>
              </div>
          ) : (
              <div className="sfua-widget-tab-container">
                  <p>Processing <a href="#" onClick={handleClickDonation}>your donation</a> in another window. <br /><a href="#" onClick={handleDonationCancel}>Click here to cancel</a>.
                  </p>
              </div>
          ) : (
              <div className="sfua-widget-tab-container">
                  <RegisterForm campaign={props.campaign} onTabCreated={onTabCreated} useBoxSelector/>
              </div>
          )}
      </div>
    </div>
  );
}

export default WidgetRunForUkraineRunReg;
