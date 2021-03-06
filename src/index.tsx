import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const campaign_SBGSU_anchor = document.getElementById("modal0");
if (campaign_SBGSU_anchor) {
  // Remove prelude
  var el = document.getElementById("latest-news")?.querySelector(".post-entry");
  if (el) {
    el.parentElement?.removeChild(el);
  }
  // Add donation form
  if (campaign_SBGSU_anchor.parentElement) {
    campaign_SBGSU_anchor.parentElement.innerHTML += '<div id="donate-widget-sbgsu" data-campaign="2FUA-SBGSU" class="secondfront-donate-widget"></div>'
  }
}

const widgetDivs = document.querySelectorAll('.secondfront-donate-widget') as NodeListOf<HTMLElement>;

widgetDivs.forEach(div => {
  ReactDOM.createRoot(div).render(
    <React.StrictMode>
      <App campaign={div.dataset.campaign || ''} />
    </React.StrictMode>
  );
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
