import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import WidgetTorMarathon from './WidgetTorMarathon';
import WidgetRunForUkraineMMXXIII from './WidgetRunForUkraineMMXXIII';
import WidgetRunForUkraineRunReg from './WidgetRunForUkraineRunReg';
import reportWebVitals from './reportWebVitals';

if (process.env.REACT_APP_BUILD_TARGET === 'WidgetTorMarathon') {
  const widgetDivs = document.querySelectorAll('.secondfront-donate-widget') as NodeListOf<HTMLElement>;

  widgetDivs.forEach(div => {
    ReactDOM.createRoot(div).render(
      <React.StrictMode>
        <WidgetTorMarathon 
          campaign={div.dataset.campaign || ''}
          targetCollections={+(div.dataset.targetCollections || "0")} />
      </React.StrictMode>
    );
  });
} else if (process.env.REACT_APP_BUILD_TARGET === 'WidgetRunForUkraineMMXXIII') {
  const widgetDivs = document.querySelectorAll('.secondfront-donate-widget') as NodeListOf<HTMLElement>;

  widgetDivs.forEach(div => {
    ReactDOM.createRoot(div).render(
      <React.StrictMode>
        <WidgetRunForUkraineMMXXIII 
          campaign={div.dataset.campaign || ''}
          targetCollections={+(div.dataset.targetCollections || "0")} />
      </React.StrictMode>
    );
  });
} else if (process.env.REACT_APP_BUILD_TARGET === 'WidgetRunForUkraineRunReg') {
  const widgetDivs = document.querySelectorAll('.runforukraine-register-widget') as NodeListOf<HTMLElement>;

  widgetDivs.forEach(div => {
    ReactDOM.createRoot(div).render(
      <React.StrictMode>
        <WidgetRunForUkraineRunReg 
          campaign={div.dataset.campaign || ''}
          targetCollections={+(div.dataset.targetCollections || "0")} />
      </React.StrictMode>
    );
  });
} else {
  // Fallback to assume default variant
  const campaign_anchor = document.getElementById("modal0");
  if (campaign_anchor) {
    // Remove prelude
    // var el = document.getElementById("latest-news")?.querySelector(".post-entry");
    // if (el) {
    //   el.parentElement?.removeChild(el);
    // }
    // Add donation form
    if (campaign_anchor.parentElement) {
      campaign_anchor.parentElement.innerHTML += '<div id="donate-widget-featured" data-campaign="2FUA-IRONBIRDS" data-enter-raffle="0" class="secondfront-donate-widget"></div>'
    }
  }

  // I'm sick of tired of WordPress and will change what I want with Javascript here. 
  const twitter_menu_top = document.getElementById("menu-item-2576");
  if (twitter_menu_top) {
    twitter_menu_top.classList.add("social-icon-nav-item");
  }
  const twitter_menu_bottom = document.getElementById("menu-item-2579");
  if (twitter_menu_bottom) {
    twitter_menu_bottom.classList.add("social-icon-nav-item-footer");
  }

  const postHeader = document.querySelector("header#header.header-blog") as HTMLElement
  const isRunForUkraine = window.location.href.includes("run-for-ukraine");
  if (postHeader && isRunForUkraine) {
    postHeader.style.backgroundImage = "url(http://secondfrontukraine.com/wp-content/uploads/2022/10/20220529UkrainiansAtOttawaRW_TA317-black.jpg)"
  }
  const isIronBirds = window.location.href.includes("ironbirds");
  if (postHeader && isIronBirds) {
    postHeader.style.backgroundImage = "url(http://secondfrontukraine.com/wp-content/uploads/2023/01/IMG_4945_HEAD.jpg)"
  }

  const redundantHeadingLine = document.querySelector("header.header-blog + .container h3 + .line-border") as HTMLElement
  if (redundantHeadingLine) {
    redundantHeadingLine.remove();
  }
  const redundantHeading = document.querySelector("header.header-blog + .container h3.mt-5.text-center") as HTMLElement
  if (redundantHeading) {
    redundantHeading.remove();
  }

  const widgetDivs = document.querySelectorAll('.secondfront-donate-widget') as NodeListOf<HTMLElement>;

  widgetDivs.forEach(div => {
    ReactDOM.createRoot(div).render(
      <React.StrictMode>
        <App campaign={div.dataset.campaign || ''}
          hideCollections={div.dataset.hideCollections === "1"}
          targetCollections={+(div.dataset.targetCollections || "0")}
          enterRaffle={div.dataset.enterRaffle === "1"} />
      </React.StrictMode>
    );
  });
}


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
