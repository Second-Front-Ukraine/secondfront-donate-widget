import React, {useState, useEffect} from 'react';
import internal from 'stream';
import { wave } from '../axiosInstances';

export interface WidgetProps {
  campaign: string;
}

interface Campaign {
    slug: string,
    collected: number,
}

function Widget(props: WidgetProps) {
    const [campaignData, setCampaignData] = useState({
        slug: props.campaign,
        collected: 0
    } as Campaign);

    useEffect(() => {
        wave.get(`/campaign/${props.campaign}`).then((result) => {
            console.log(result);
            setCampaignData(result.data.campaign);
        })
    }, [])

    return (
        <div className="2fua-widget">
            <span>Some campaign {campaignData.slug} {campaignData.collected}</span>
        </div>
    );
}

export default Widget;
