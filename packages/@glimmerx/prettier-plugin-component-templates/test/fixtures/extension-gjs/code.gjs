import Component, { hbs } from '@glimmerx/component';
import { AssetStyle, url } from 'some-external-library';
import Page from './Page';

export default class Layout extends Component {
  static template = hbs`
  <Page @arg1={{@arg1}} @arg2={{@arg1}} @arg2={{@arg1}} @arg3={{@arg1}} @arg4={{@arg1}} @arg5={{@arg1}}>
    <:head>
      <AssetStyle @path="stylesheets/layout"/>
      <title>Hello Layout</title>
      <meta name="asset-url" id="ui-icons/static/images/sprite-asset" content={{url path="ui-icons/static/images/icons.svg"}}>
      <script src={{url "ui-icons/static/javascripts/icons.js"}} async></script>
    </:head>
    <:content>
      <p>
        Haxx0r ipsum ip machine code ctl-c epoch socket Leslie Lamport worm null gc. False system fork wombat gcc stdio.h case interpreter stack trace buffer fatal unix ddos port. Packet sniffer pragma fopen stack mountain dew leet.
      </p>
      <p>
        Public giga highjack sudo linux fork root public protocol James T. Kirk leapfrog float suitably small values shell. Mutex fatal void char exception tarball Starcraft brute force. Try catch warez port interpreter error true else afk sql foad January 1, 1970.
      </p>
      <p> Hello </p>
      <p>
        Thread bit headers salt float race condition wannabee memory leak bytes regex packet warez snarf malloc deadlock overflow. Afk baz double flood d00dz semaphore all your base are belong to us ssh. Injection daemon segfault highjack function access gobble int exception ascii James T. Kirk printf class *.* mega foad shell bar for Linus Torvalds.
      </p>
    </:content>
  </Page>
  `;
}
