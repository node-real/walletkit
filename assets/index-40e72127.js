import{k as S,d as q,f as F,t as K,n as Je,i as Ze,I as xe,s as H,B as en,h as V,j as nn,c as p,l as W}from"./index-b11eb9ad.js";const tn=/^bytes([1-9]|1[0-9]|2[0-9]|3[0-2])?$/,an=/^(u?int)(8|16|24|32|40|48|56|64|72|80|88|96|104|112|120|128|136|144|152|160|168|176|184|192|200|208|216|224|232|240|248|256)?$/;function sn(e){const{domain:n={},message:t,primaryType:i}=e,r={EIP712Domain:dn({domain:n}),...e.types};un({domain:n,message:t,primaryType:i,types:r});const a=["0x1901"];return n&&a.push(cn({domain:n,types:r})),i!=="EIP712Domain"&&a.push($({data:t,primaryType:i,types:r})),S(q(a))}function cn({domain:e,types:n}){return $({data:e,primaryType:"EIP712Domain",types:n})}function $({data:e,primaryType:n,types:t}){const i=X({data:e,primaryType:n,types:t});return S(i)}function X({data:e,primaryType:n,types:t}){const i=[{type:"bytes32"}],r=[rn({primaryType:n,types:t})];for(const a of t[n]){const[u,l]=z({types:t,name:a.name,type:a.type,value:e[a.name]});i.push(u),r.push(l)}return F(i,r)}function rn({primaryType:e,types:n}){const t=K(on({primaryType:e,types:n}));return S(t)}function on({primaryType:e,types:n}){let t="";const i=Q({primaryType:e,types:n});i.delete(e);const r=[e,...Array.from(i).sort()];for(const a of r)t+=`${a}(${n[a].map(({name:u,type:l})=>`${l} ${u}`).join(",")})`;return t}function Q({primaryType:e,types:n},t=new Set){const i=e.match(/^\w*/u),r=i==null?void 0:i[0];if(t.has(r)||n[r]===void 0)return t;t.add(r);for(const a of n[r])Q({primaryType:a.type,types:n},t);return t}function z({types:e,name:n,type:t,value:i}){if(e[t]!==void 0)return[{type:"bytes32"},S(X({data:i,primaryType:t,types:e}))];if(t==="bytes")return i=`0x${(i.length%2?"0":"")+i.slice(2)}`,[{type:"bytes32"},S(i)];if(t==="string")return[{type:"bytes32"},S(K(i))];if(t.lastIndexOf("]")===t.length-1){const r=t.slice(0,t.lastIndexOf("[")),a=i.map(u=>z({name:n,type:r,types:e,value:u}));return[{type:"bytes32"},S(F(a.map(([u])=>u),a.map(([,u])=>u)))]}return[{type:t},i]}function un(e){const{domain:n,message:t,primaryType:i,types:r}=e,a=(u,l)=>{for(const f of u){const{name:v,type:g}=f,h=l[v],C=g.match(an);if(C&&(typeof h=="number"||typeof h=="bigint")){const[L,m,B]=C;Je(h,{signed:m==="int",size:Number.parseInt(B)/8})}if(g==="address"&&typeof h=="string"&&!Ze(h))throw new xe({address:h});const D=g.match(tn);if(D){const[L,m]=D;if(m&&H(h)!==Number.parseInt(m))throw new en({expectedSize:Number.parseInt(m),givenSize:H(h)})}const w=r[g];w&&a(w,h)}};r.EIP712Domain&&n&&a(r.EIP712Domain,n),i!=="EIP712Domain"&&a(r[i],t)}function dn({domain:e}){return[typeof(e==null?void 0:e.name)=="string"&&{name:"name",type:"string"},(e==null?void 0:e.version)&&{name:"version",type:"string"},typeof(e==null?void 0:e.chainId)=="number"&&{name:"chainId",type:"uint256"},(e==null?void 0:e.verifyingContract)&&{name:"verifyingContract",type:"address"},(e==null?void 0:e.salt)&&{name:"salt",type:"bytes32"}].filter(Boolean)}const ln=`Ethereum Signed Message:
`;function fn(e){const n=(()=>typeof e=="string"?V(e):typeof e.raw=="string"?e.raw:nn(e.raw))(),t=V(`${ln}${H(n)}`);return q([t,n])}function gn(e,n){return S(fn(e),n)}const hn=()=>"9.1.0",En=e=>e.toString(16).padStart(2,"0"),_n=e=>{const n=new Uint8Array((e||40)/2);return window.crypto.getRandomValues(n),Array.from(n,En).join("")},Tn=()=>typeof window<"u"?_n(10):new Date().getTime().toString(36);class P{}P.makeRequest=(e,n)=>({id:Tn(),method:e,params:n,env:{sdkVersion:hn()}});P.makeResponse=(e,n,t)=>({id:e,success:!0,version:t,data:n});P.makeErrorResponse=(e,n,t)=>({id:e,success:!1,error:n,version:t});var E;(function(e){e.sendTransactions="sendTransactions",e.rpcCall="rpcCall",e.getChainInfo="getChainInfo",e.getSafeInfo="getSafeInfo",e.getTxBySafeTxHash="getTxBySafeTxHash",e.getSafeBalances="getSafeBalances",e.signMessage="signMessage",e.signTypedMessage="signTypedMessage",e.getEnvironmentInfo="getEnvironmentInfo",e.getOffChainSignature="getOffChainSignature",e.requestAddressBook="requestAddressBook",e.wallet_getPermissions="wallet_getPermissions",e.wallet_requestPermissions="wallet_requestPermissions"})(E||(E={}));var U;(function(e){e.requestAddressBook="requestAddressBook"})(U||(U={}));class yn{constructor(n=null,t=!1){this.allowedOrigins=null,this.callbacks=new Map,this.debugMode=!1,this.isServer=typeof window>"u",this.isValidMessage=({origin:i,data:r,source:a})=>{const u=!r,l=!this.isServer&&a===window.parent,f=typeof r.version<"u"&&parseInt(r.version.split(".")[0]),v=typeof f=="number"&&f>=1;let g=!0;return Array.isArray(this.allowedOrigins)&&(g=this.allowedOrigins.find(h=>h.test(i))!==void 0),!u&&l&&v&&g},this.logIncomingMessage=i=>{console.info(`Safe Apps SDK v1: A message was received from origin ${i.origin}. `,i.data)},this.onParentMessage=i=>{this.isValidMessage(i)&&(this.debugMode&&this.logIncomingMessage(i),this.handleIncomingMessage(i.data))},this.handleIncomingMessage=i=>{const{id:r}=i,a=this.callbacks.get(r);a&&(a(i),this.callbacks.delete(r))},this.send=(i,r)=>{const a=P.makeRequest(i,r);if(this.isServer)throw new Error("Window doesn't exist");return window.parent.postMessage(a,"*"),new Promise((u,l)=>{this.callbacks.set(a.id,f=>{if(!f.success){l(new Error(f.error));return}u(f)})})},this.allowedOrigins=n,this.debugMode=t,this.isServer||window.addEventListener("message",this.onParentMessage)}}const Y=e=>typeof e=="object"&&e!=null&&"domain"in e&&"types"in e&&"message"in e;var b={},T={},y={},G=p&&p.__awaiter||function(e,n,t,i){function r(a){return a instanceof t?a:new t(function(u){u(a)})}return new(t||(t=Promise))(function(a,u){function l(g){try{v(i.next(g))}catch(h){u(h)}}function f(g){try{v(i.throw(g))}catch(h){u(h)}}function v(g){g.done?a(g.value):r(g.value).then(l,f)}v((i=i.apply(e,n||[])).next())})};Object.defineProperty(y,"__esModule",{value:!0});y.getData=y.fetchData=y.stringifyQuery=y.insertParams=void 0;const vn=e=>typeof e=="object"&&e!==null&&"code"in e&&"message"in e;function In(e,n,t){return e.replace(new RegExp(`\\{${n}\\}`,"g"),t)}function An(e,n){return n?Object.keys(n).reduce((t,i)=>In(t,i,String(n[i])),e):e}y.insertParams=An;function Sn(e){if(!e)return"";const n=new URLSearchParams;Object.keys(e).forEach(i=>{e[i]!=null&&n.append(i,String(e[i]))});const t=n.toString();return t?`?${t}`:""}y.stringifyQuery=Sn;function J(e){return G(this,void 0,void 0,function*(){let n;try{n=yield e.json()}catch{n={}}if(!e.ok){const t=vn(n)?`CGW error - ${n.code}: ${n.message}`:`CGW error - status ${e.statusText}`;throw new Error(t)}return n})}function mn(e,n,t,i,r){return G(this,void 0,void 0,function*(){const a=Object.assign({"Content-Type":"application/json"},i),u={method:n??"POST",headers:a};r&&(u.credentials=r),t!=null&&(u.body=typeof t=="string"?t:JSON.stringify(t));const l=yield fetch(e,u);return J(l)})}y.fetchData=mn;function On(e,n,t){return G(this,void 0,void 0,function*(){const i={method:"GET"};n&&(i.headers=Object.assign(Object.assign({},n),{"Content-Type":"application/json"})),t&&(i.credentials=t);const r=yield fetch(e,i);return J(r)})}y.getData=On;Object.defineProperty(T,"__esModule",{value:!0});T.getEndpoint=T.deleteEndpoint=T.putEndpoint=T.postEndpoint=void 0;const O=y;function R(e,n,t,i){const r=(0,O.insertParams)(n,t),a=(0,O.stringifyQuery)(i);return`${e}${r}${a}`}function pn(e,n,t){const i=R(e,n,t==null?void 0:t.path,t==null?void 0:t.query);return(0,O.fetchData)(i,"POST",t==null?void 0:t.body,t==null?void 0:t.headers,t==null?void 0:t.credentials)}T.postEndpoint=pn;function Nn(e,n,t){const i=R(e,n,t==null?void 0:t.path,t==null?void 0:t.query);return(0,O.fetchData)(i,"PUT",t==null?void 0:t.body,t==null?void 0:t.headers,t==null?void 0:t.credentials)}T.putEndpoint=Nn;function bn(e,n,t){const i=R(e,n,t==null?void 0:t.path,t==null?void 0:t.query);return(0,O.fetchData)(i,"DELETE",t==null?void 0:t.body,t==null?void 0:t.headers,t==null?void 0:t.credentials)}T.deleteEndpoint=bn;function Cn(e,n,t,i){if(i)return(0,O.getData)(i,void 0,t==null?void 0:t.credentials);const r=R(e,n,t==null?void 0:t.path,t==null?void 0:t.query);return(0,O.getData)(r,t==null?void 0:t.headers,t==null?void 0:t.credentials)}T.getEndpoint=Cn;var M={};Object.defineProperty(M,"__esModule",{value:!0});M.DEFAULT_BASE_URL=void 0;M.DEFAULT_BASE_URL="https://safe-client.safe.global";var Z={};(function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.ImplementationVersionState=void 0,function(n){n.UP_TO_DATE="UP_TO_DATE",n.OUTDATED="OUTDATED",n.UNKNOWN="UNKNOWN"}(e.ImplementationVersionState||(e.ImplementationVersionState={}))})(Z);var x={};(function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.SafeAppSocialPlatforms=e.SafeAppFeatures=e.SafeAppAccessPolicyTypes=void 0,function(n){n.NoRestrictions="NO_RESTRICTIONS",n.DomainAllowlist="DOMAIN_ALLOWLIST"}(e.SafeAppAccessPolicyTypes||(e.SafeAppAccessPolicyTypes={})),function(n){n.BATCHED_TRANSACTIONS="BATCHED_TRANSACTIONS"}(e.SafeAppFeatures||(e.SafeAppFeatures={})),function(n){n.TWITTER="TWITTER",n.GITHUB="GITHUB",n.DISCORD="DISCORD"}(e.SafeAppSocialPlatforms||(e.SafeAppSocialPlatforms={}))})(x);var ee={};(function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.LabelValue=e.StartTimeValue=e.DurationType=e.DetailedExecutionInfoType=e.TransactionListItemType=e.ConflictType=e.TransactionInfoType=e.SettingsInfoType=e.TransactionTokenType=e.TransferDirection=e.TransactionStatus=e.Operation=void 0,function(n){n[n.CALL=0]="CALL",n[n.DELEGATE=1]="DELEGATE"}(e.Operation||(e.Operation={})),function(n){n.AWAITING_CONFIRMATIONS="AWAITING_CONFIRMATIONS",n.AWAITING_EXECUTION="AWAITING_EXECUTION",n.CANCELLED="CANCELLED",n.FAILED="FAILED",n.SUCCESS="SUCCESS"}(e.TransactionStatus||(e.TransactionStatus={})),function(n){n.INCOMING="INCOMING",n.OUTGOING="OUTGOING",n.UNKNOWN="UNKNOWN"}(e.TransferDirection||(e.TransferDirection={})),function(n){n.ERC20="ERC20",n.ERC721="ERC721",n.NATIVE_COIN="NATIVE_COIN"}(e.TransactionTokenType||(e.TransactionTokenType={})),function(n){n.SET_FALLBACK_HANDLER="SET_FALLBACK_HANDLER",n.ADD_OWNER="ADD_OWNER",n.REMOVE_OWNER="REMOVE_OWNER",n.SWAP_OWNER="SWAP_OWNER",n.CHANGE_THRESHOLD="CHANGE_THRESHOLD",n.CHANGE_IMPLEMENTATION="CHANGE_IMPLEMENTATION",n.ENABLE_MODULE="ENABLE_MODULE",n.DISABLE_MODULE="DISABLE_MODULE",n.SET_GUARD="SET_GUARD",n.DELETE_GUARD="DELETE_GUARD"}(e.SettingsInfoType||(e.SettingsInfoType={})),function(n){n.TRANSFER="Transfer",n.SETTINGS_CHANGE="SettingsChange",n.CUSTOM="Custom",n.CREATION="Creation",n.SWAP_ORDER="SwapOrder",n.TWAP_ORDER="TwapOrder",n.SWAP_TRANSFER="SwapTransfer"}(e.TransactionInfoType||(e.TransactionInfoType={})),function(n){n.NONE="None",n.HAS_NEXT="HasNext",n.END="End"}(e.ConflictType||(e.ConflictType={})),function(n){n.TRANSACTION="TRANSACTION",n.LABEL="LABEL",n.CONFLICT_HEADER="CONFLICT_HEADER",n.DATE_LABEL="DATE_LABEL"}(e.TransactionListItemType||(e.TransactionListItemType={})),function(n){n.MULTISIG="MULTISIG",n.MODULE="MODULE"}(e.DetailedExecutionInfoType||(e.DetailedExecutionInfoType={})),function(n){n.AUTO="AUTO",n.LIMIT_DURATION="LIMIT_DURATION"}(e.DurationType||(e.DurationType={})),function(n){n.AT_MINING_TIME="AT_MINING_TIME",n.AT_EPOCH="AT_EPOCH"}(e.StartTimeValue||(e.StartTimeValue={})),function(n){n.Queued="Queued",n.Next="Next"}(e.LabelValue||(e.LabelValue={}))})(ee);var ne={};(function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.FEATURES=e.GAS_PRICE_TYPE=e.RPC_AUTHENTICATION=void 0,function(n){n.API_KEY_PATH="API_KEY_PATH",n.NO_AUTHENTICATION="NO_AUTHENTICATION",n.UNKNOWN="UNKNOWN"}(e.RPC_AUTHENTICATION||(e.RPC_AUTHENTICATION={})),function(n){n.ORACLE="ORACLE",n.FIXED="FIXED",n.FIXED_1559="FIXED1559",n.UNKNOWN="UNKNOWN"}(e.GAS_PRICE_TYPE||(e.GAS_PRICE_TYPE={})),function(n){n.ERC721="ERC721",n.SAFE_APPS="SAFE_APPS",n.CONTRACT_INTERACTION="CONTRACT_INTERACTION",n.DOMAIN_LOOKUP="DOMAIN_LOOKUP",n.SPENDING_LIMIT="SPENDING_LIMIT",n.EIP1559="EIP1559",n.SAFE_TX_GAS_OPTIONAL="SAFE_TX_GAS_OPTIONAL",n.TX_SIMULATION="TX_SIMULATION",n.EIP1271="EIP1271"}(e.FEATURES||(e.FEATURES={}))})(ne);var te={};(function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.TokenType=void 0,function(n){n.ERC20="ERC20",n.ERC721="ERC721",n.NATIVE_TOKEN="NATIVE_TOKEN"}(e.TokenType||(e.TokenType={}))})(te);var ie={};Object.defineProperty(ie,"__esModule",{value:!0});var ae={};(function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.ConfirmationViewTypes=void 0,function(n){n.COW_SWAP_ORDER="COW_SWAP_ORDER",n.COW_SWAP_TWAP_ORDER="COW_SWAP_TWAP_ORDER"}(e.ConfirmationViewTypes||(e.ConfirmationViewTypes={}))})(ae);var se={};(function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.SafeMessageStatus=e.SafeMessageListItemType=void 0,function(n){n.DATE_LABEL="DATE_LABEL",n.MESSAGE="MESSAGE"}(e.SafeMessageListItemType||(e.SafeMessageListItemType={})),function(n){n.NEEDS_CONFIRMATION="NEEDS_CONFIRMATION",n.CONFIRMED="CONFIRMED"}(e.SafeMessageStatus||(e.SafeMessageStatus={}))})(se);var ce={};(function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.DeviceType=void 0,function(n){n.ANDROID="ANDROID",n.IOS="IOS",n.WEB="WEB"}(e.DeviceType||(e.DeviceType={}))})(ce);var re={};Object.defineProperty(re,"__esModule",{value:!0});(function(e){var n=p&&p.__createBinding||(Object.create?function(s,c,o,d){d===void 0&&(d=o);var A=Object.getOwnPropertyDescriptor(c,o);(!A||("get"in A?!c.__esModule:A.writable||A.configurable))&&(A={enumerable:!0,get:function(){return c[o]}}),Object.defineProperty(s,d,A)}:function(s,c,o,d){d===void 0&&(d=o),s[d]=c[o]}),t=p&&p.__exportStar||function(s,c){for(var o in s)o!=="default"&&!Object.prototype.hasOwnProperty.call(c,o)&&n(c,s,o)};Object.defineProperty(e,"__esModule",{value:!0}),e.deleteAccount=e.getAccount=e.createAccount=e.verifyAuth=e.getAuthNonce=e.getContract=e.getSafeOverviews=e.unsubscribeAll=e.unsubscribeSingle=e.registerRecoveryModule=e.deleteRegisteredEmail=e.getRegisteredEmail=e.verifyEmail=e.resendEmailVerificationCode=e.changeEmail=e.registerEmail=e.unregisterDevice=e.unregisterSafe=e.registerDevice=e.getDelegates=e.confirmSafeMessage=e.proposeSafeMessage=e.getSafeMessage=e.getSafeMessages=e.getDecodedData=e.getMasterCopies=e.getSafeApps=e.getChainConfig=e.getChainsConfig=e.getConfirmationView=e.proposeTransaction=e.getNonces=e.postSafeGasEstimation=e.deleteTransaction=e.getTransactionDetails=e.getTransactionQueue=e.getTransactionHistory=e.getCollectiblesPage=e.getCollectibles=e.getAllOwnedSafes=e.getOwnedSafes=e.getFiatCurrencies=e.getBalances=e.getMultisigTransactions=e.getModuleTransactions=e.getIncomingTransfers=e.getSafeInfo=e.getRelayCount=e.relayTransaction=e.setBaseUrl=void 0,e.putAccountDataSettings=e.getAccountDataSettings=e.getAccountDataTypes=void 0;const i=T,r=M;t(Z,e),t(x,e),t(ee,e),t(ne,e),t(te,e),t(ie,e),t(ae,e),t(se,e),t(ce,e),t(re,e);let a=r.DEFAULT_BASE_URL;const u=s=>{a=s};e.setBaseUrl=u;function l(s,c){return(0,i.postEndpoint)(a,"/v1/chains/{chainId}/relay",{path:{chainId:s},body:c})}e.relayTransaction=l;function f(s,c){return(0,i.getEndpoint)(a,"/v1/chains/{chainId}/relay/{address}",{path:{chainId:s,address:c}})}e.getRelayCount=f;function v(s,c){return(0,i.getEndpoint)(a,"/v1/chains/{chainId}/safes/{address}",{path:{chainId:s,address:c}})}e.getSafeInfo=v;function g(s,c,o,d){return(0,i.getEndpoint)(a,"/v1/chains/{chainId}/safes/{address}/incoming-transfers/",{path:{chainId:s,address:c},query:o},d)}e.getIncomingTransfers=g;function h(s,c,o,d){return(0,i.getEndpoint)(a,"/v1/chains/{chainId}/safes/{address}/module-transactions/",{path:{chainId:s,address:c},query:o},d)}e.getModuleTransactions=h;function C(s,c,o,d){return(0,i.getEndpoint)(a,"/v1/chains/{chainId}/safes/{address}/multisig-transactions/",{path:{chainId:s,address:c},query:o},d)}e.getMultisigTransactions=C;function D(s,c,o="usd",d={}){return(0,i.getEndpoint)(a,"/v1/chains/{chainId}/safes/{address}/balances/{currency}",{path:{chainId:s,address:c,currency:o},query:d})}e.getBalances=D;function w(){return(0,i.getEndpoint)(a,"/v1/balances/supported-fiat-codes")}e.getFiatCurrencies=w;function L(s,c){return(0,i.getEndpoint)(a,"/v1/chains/{chainId}/owners/{address}/safes",{path:{chainId:s,address:c}})}e.getOwnedSafes=L;function m(s){return(0,i.getEndpoint)(a,"/v1/owners/{address}/safes",{path:{address:s}})}e.getAllOwnedSafes=m;function B(s,c,o={}){return(0,i.getEndpoint)(a,"/v1/chains/{chainId}/safes/{address}/collectibles",{path:{chainId:s,address:c},query:o})}e.getCollectibles=B;function de(s,c,o={},d){return(0,i.getEndpoint)(a,"/v2/chains/{chainId}/safes/{address}/collectibles",{path:{chainId:s,address:c},query:o},d)}e.getCollectiblesPage=de;function le(s,c,o={},d){return(0,i.getEndpoint)(a,"/v1/chains/{chainId}/safes/{safe_address}/transactions/history",{path:{chainId:s,safe_address:c},query:o},d)}e.getTransactionHistory=le;function fe(s,c,o={},d){return(0,i.getEndpoint)(a,"/v1/chains/{chainId}/safes/{safe_address}/transactions/queued",{path:{chainId:s,safe_address:c},query:o},d)}e.getTransactionQueue=fe;function ge(s,c){return(0,i.getEndpoint)(a,"/v1/chains/{chainId}/transactions/{transactionId}",{path:{chainId:s,transactionId:c}})}e.getTransactionDetails=ge;function he(s,c,o){return(0,i.deleteEndpoint)(a,"/v1/chains/{chainId}/transactions/{safeTxHash}",{path:{chainId:s,safeTxHash:c},body:{signature:o}})}e.deleteTransaction=he;function Ee(s,c,o){return(0,i.postEndpoint)(a,"/v2/chains/{chainId}/safes/{safe_address}/multisig-transactions/estimations",{path:{chainId:s,safe_address:c},body:o})}e.postSafeGasEstimation=Ee;function _e(s,c){return(0,i.getEndpoint)(a,"/v1/chains/{chainId}/safes/{safe_address}/nonces",{path:{chainId:s,safe_address:c}})}e.getNonces=_e;function Te(s,c,o){return(0,i.postEndpoint)(a,"/v1/chains/{chainId}/transactions/{safe_address}/propose",{path:{chainId:s,safe_address:c},body:o})}e.proposeTransaction=Te;function ye(s,c,o,d){return(0,i.postEndpoint)(a,"/v1/chains/{chainId}/safes/{safe_address}/views/transaction-confirmation",{path:{chainId:s,safe_address:c},body:{data:o,to:d}})}e.getConfirmationView=ye;function ve(s){return(0,i.getEndpoint)(a,"/v1/chains",{query:s})}e.getChainsConfig=ve;function Ie(s){return(0,i.getEndpoint)(a,"/v1/chains/{chainId}",{path:{chainId:s}})}e.getChainConfig=Ie;function Ae(s,c={}){return(0,i.getEndpoint)(a,"/v1/chains/{chainId}/safe-apps",{path:{chainId:s},query:c})}e.getSafeApps=Ae;function Se(s){return(0,i.getEndpoint)(a,"/v1/chains/{chainId}/about/master-copies",{path:{chainId:s}})}e.getMasterCopies=Se;function me(s,c,o){return(0,i.postEndpoint)(a,"/v1/chains/{chainId}/data-decoder",{path:{chainId:s},body:{data:c,to:o}})}e.getDecodedData=me;function Oe(s,c,o){return(0,i.getEndpoint)(a,"/v1/chains/{chainId}/safes/{safe_address}/messages",{path:{chainId:s,safe_address:c},query:{}},o)}e.getSafeMessages=Oe;function pe(s,c){return(0,i.getEndpoint)(a,"/v1/chains/{chainId}/messages/{message_hash}",{path:{chainId:s,message_hash:c}})}e.getSafeMessage=pe;function Ne(s,c,o){return(0,i.postEndpoint)(a,"/v1/chains/{chainId}/safes/{safe_address}/messages",{path:{chainId:s,safe_address:c},body:o})}e.proposeSafeMessage=Ne;function be(s,c,o){return(0,i.postEndpoint)(a,"/v1/chains/{chainId}/messages/{message_hash}/signatures",{path:{chainId:s,message_hash:c},body:o})}e.confirmSafeMessage=be;function Ce(s,c={}){return(0,i.getEndpoint)(a,"/v1/chains/{chainId}/delegates",{path:{chainId:s},query:c})}e.getDelegates=Ce;function De(s){return(0,i.postEndpoint)(a,"/v1/register/notifications",{body:s})}e.registerDevice=De;function we(s,c,o){return(0,i.deleteEndpoint)(a,"/v1/chains/{chainId}/notifications/devices/{uuid}/safes/{safe_address}",{path:{chainId:s,safe_address:c,uuid:o}})}e.unregisterSafe=we;function Pe(s,c){return(0,i.deleteEndpoint)(a,"/v1/chains/{chainId}/notifications/devices/{uuid}",{path:{chainId:s,uuid:c}})}e.unregisterDevice=Pe;function Re(s,c,o,d){return(0,i.postEndpoint)(a,"/v1/chains/{chainId}/safes/{safe_address}/emails",{path:{chainId:s,safe_address:c},body:o,headers:d})}e.registerEmail=Re;function Me(s,c,o,d,A){return(0,i.putEndpoint)(a,"/v1/chains/{chainId}/safes/{safe_address}/emails/{signer}",{path:{chainId:s,safe_address:c,signer:o},body:d,headers:A})}e.changeEmail=Me;function Le(s,c,o){return(0,i.postEndpoint)(a,"/v1/chains/{chainId}/safes/{safe_address}/emails/{signer}/verify-resend",{path:{chainId:s,safe_address:c,signer:o},body:""})}e.resendEmailVerificationCode=Le;function Be(s,c,o,d){return(0,i.putEndpoint)(a,"/v1/chains/{chainId}/safes/{safe_address}/emails/{signer}/verify",{path:{chainId:s,safe_address:c,signer:o},body:d})}e.verifyEmail=Be;function He(s,c,o,d){return(0,i.getEndpoint)(a,"/v1/chains/{chainId}/safes/{safe_address}/emails/{signer}",{path:{chainId:s,safe_address:c,signer:o},headers:d})}e.getRegisteredEmail=He;function Ue(s,c,o,d){return(0,i.deleteEndpoint)(a,"/v1/chains/{chainId}/safes/{safe_address}/emails/{signer}",{path:{chainId:s,safe_address:c,signer:o},headers:d})}e.deleteRegisteredEmail=Ue;function je(s,c,o){return(0,i.postEndpoint)(a,"/v1/chains/{chainId}/safes/{safe_address}/recovery",{path:{chainId:s,safe_address:c},body:o})}e.registerRecoveryModule=je;function Ge(s){return(0,i.deleteEndpoint)(a,"/v1/subscriptions",{query:s})}e.unsubscribeSingle=Ge;function Ve(s){return(0,i.deleteEndpoint)(a,"/v1/subscriptions/all",{query:s})}e.unsubscribeAll=Ve;function We(s,c){return(0,i.getEndpoint)(a,"/v1/safes",{query:Object.assign(Object.assign({},c),{safes:s.join(",")})})}e.getSafeOverviews=We;function ke(s,c){return(0,i.getEndpoint)(a,"/v1/chains/{chainId}/contracts/{contractAddress}",{path:{chainId:s,contractAddress:c}})}e.getContract=ke;function qe(){return(0,i.getEndpoint)(a,"/v1/auth/nonce",{credentials:"include"})}e.getAuthNonce=qe;function Fe(s){return(0,i.postEndpoint)(a,"/v1/auth/verify",{body:s,credentials:"include"})}e.verifyAuth=Fe;function Ke(s){return(0,i.postEndpoint)(a,"/v1/accounts",{body:s,credentials:"include"})}e.createAccount=Ke;function $e(s){return(0,i.getEndpoint)(a,"/v1/accounts/{address}",{path:{address:s},credentials:"include"})}e.getAccount=$e;function Xe(s){return(0,i.deleteEndpoint)(a,"/v1/accounts/{address}",{path:{address:s},credentials:"include"})}e.deleteAccount=Xe;function Qe(){return(0,i.getEndpoint)(a,"/v1/accounts/data-types")}e.getAccountDataTypes=Qe;function ze(s){return(0,i.getEndpoint)(a,"/v1/accounts/{address}/data-settings",{path:{address:s},credentials:"include"})}e.getAccountDataSettings=ze;function Ye(s,c){return(0,i.putEndpoint)(a,"/v1/accounts/{address}/data-settings",{path:{address:s},body:c,credentials:"include"})}e.putAccountDataSettings=Ye})(b);class Dn{constructor(n){this.communicator=n}async getBySafeTxHash(n){if(!n)throw new Error("Invalid safeTxHash");return(await this.communicator.send(E.getTxBySafeTxHash,{safeTxHash:n})).data}async signMessage(n){const t={message:n};return(await this.communicator.send(E.signMessage,t)).data}async signTypedMessage(n){if(!Y(n))throw new Error("Invalid typed data");return(await this.communicator.send(E.signTypedMessage,{typedData:n})).data}async send({txs:n,params:t}){if(!n||!n.length)throw new Error("No transactions were passed");const i={txs:n,params:t};return(await this.communicator.send(E.sendTransactions,i)).data}}const _={eth_call:"eth_call",eth_gasPrice:"eth_gasPrice",eth_getLogs:"eth_getLogs",eth_getBalance:"eth_getBalance",eth_getCode:"eth_getCode",eth_getBlockByHash:"eth_getBlockByHash",eth_getBlockByNumber:"eth_getBlockByNumber",eth_getStorageAt:"eth_getStorageAt",eth_getTransactionByHash:"eth_getTransactionByHash",eth_getTransactionReceipt:"eth_getTransactionReceipt",eth_getTransactionCount:"eth_getTransactionCount",eth_estimateGas:"eth_estimateGas",safe_setSettings:"safe_setSettings"},I={defaultBlockParam:(e="latest")=>e,returnFullTxObjectParam:(e=!1)=>e,blockNumberToHex:e=>Number.isInteger(e)?`0x${e.toString(16)}`:e};class wn{constructor(n){this.communicator=n,this.call=this.buildRequest({call:_.eth_call,formatters:[null,I.defaultBlockParam]}),this.getBalance=this.buildRequest({call:_.eth_getBalance,formatters:[null,I.defaultBlockParam]}),this.getCode=this.buildRequest({call:_.eth_getCode,formatters:[null,I.defaultBlockParam]}),this.getStorageAt=this.buildRequest({call:_.eth_getStorageAt,formatters:[null,I.blockNumberToHex,I.defaultBlockParam]}),this.getPastLogs=this.buildRequest({call:_.eth_getLogs}),this.getBlockByHash=this.buildRequest({call:_.eth_getBlockByHash,formatters:[null,I.returnFullTxObjectParam]}),this.getBlockByNumber=this.buildRequest({call:_.eth_getBlockByNumber,formatters:[I.blockNumberToHex,I.returnFullTxObjectParam]}),this.getTransactionByHash=this.buildRequest({call:_.eth_getTransactionByHash}),this.getTransactionReceipt=this.buildRequest({call:_.eth_getTransactionReceipt}),this.getTransactionCount=this.buildRequest({call:_.eth_getTransactionCount,formatters:[null,I.defaultBlockParam]}),this.getGasPrice=this.buildRequest({call:_.eth_gasPrice}),this.getEstimateGas=t=>this.buildRequest({call:_.eth_estimateGas})([t]),this.setSafeSettings=this.buildRequest({call:_.safe_setSettings})}buildRequest(n){const{call:t,formatters:i}=n;return async r=>{i&&Array.isArray(r)&&i.forEach((l,f)=>{l&&(r[f]=l(r[f]))});const a={call:t,params:r||[]};return(await this.communicator.send(E.rpcCall,a)).data}}}const Pn="0x1626ba7e",Rn="0x20c13b0b",j=4001;class N extends Error{constructor(n,t,i){super(n),this.code=t,this.data=i,Object.setPrototypeOf(this,N.prototype)}}class oe{constructor(n){this.communicator=n}async getPermissions(){return(await this.communicator.send(E.wallet_getPermissions,void 0)).data}async requestPermissions(n){if(!this.isPermissionRequestValid(n))throw new N("Permissions request is invalid",j);try{return(await this.communicator.send(E.wallet_requestPermissions,n)).data}catch{throw new N("Permissions rejected",j)}}isPermissionRequestValid(n){return n.every(t=>typeof t=="object"?Object.keys(t).every(i=>!!Object.values(U).includes(i)):!1)}}const k=(e,n)=>n.some(t=>t.parentCapability===e),Mn=()=>(e,n,t)=>{const i=t.value;return t.value=async function(){const r=new oe(this.communicator);let a=await r.getPermissions();if(k(n,a)||(a=await r.requestPermissions([{[n]:{}}])),!k(n,a))throw new N("Permissions rejected",j);return i.apply(this)},t};var Ln=globalThis&&globalThis.__decorate||function(e,n,t,i){var r=arguments.length,a=r<3?n:i===null?i=Object.getOwnPropertyDescriptor(n,t):i,u;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")a=Reflect.decorate(e,n,t,i);else for(var l=e.length-1;l>=0;l--)(u=e[l])&&(a=(r<3?u(a):r>3?u(n,t,a):u(n,t))||a);return r>3&&a&&Object.defineProperty(n,t,a),a};class ue{constructor(n){this.communicator=n}async getChainInfo(){return(await this.communicator.send(E.getChainInfo,void 0)).data}async getInfo(){return(await this.communicator.send(E.getSafeInfo,void 0)).data}async experimental_getBalances({currency:n="usd"}={}){return(await this.communicator.send(E.getSafeBalances,{currency:n})).data}async check1271Signature(n,t="0x"){const i=await this.getInfo(),r=W({abi:[{constant:!1,inputs:[{name:"_dataHash",type:"bytes32"},{name:"_signature",type:"bytes"}],name:"isValidSignature",outputs:[{name:"",type:"bytes4"}],payable:!1,stateMutability:"nonpayable",type:"function"}],functionName:"isValidSignature",args:[n,t]}),a={call:_.eth_call,params:[{to:i.safeAddress,data:r},"latest"]};try{return(await this.communicator.send(E.rpcCall,a)).data.slice(0,10).toLowerCase()===Pn}catch{return!1}}async check1271SignatureBytes(n,t="0x"){const i=await this.getInfo(),r=W({abi:[{constant:!1,inputs:[{name:"_data",type:"bytes"},{name:"_signature",type:"bytes"}],name:"isValidSignature",outputs:[{name:"",type:"bytes4"}],payable:!1,stateMutability:"nonpayable",type:"function"}],functionName:"isValidSignature",args:[n,t]}),a={call:_.eth_call,params:[{to:i.safeAddress,data:r},"latest"]};try{return(await this.communicator.send(E.rpcCall,a)).data.slice(0,10).toLowerCase()===Rn}catch{return!1}}calculateMessageHash(n){return gn(n)}calculateTypedMessageHash(n){const t=typeof n.domain.chainId=="object"?n.domain.chainId.toNumber():Number(n.domain.chainId);let i=n.primaryType;if(!i){const r=Object.values(n.types),a=Object.keys(n.types).filter(u=>r.every(l=>l.every(({type:f})=>f.replace("[","").replace("]","")!==u)));if(a.length===0||a.length>1)throw new Error("Please specify primaryType");i=a[0]}return sn({message:n.message,domain:{...n.domain,chainId:t,verifyingContract:n.domain.verifyingContract,salt:n.domain.salt},types:n.types,primaryType:i})}async getOffChainSignature(n){return(await this.communicator.send(E.getOffChainSignature,n)).data}async isMessageSigned(n,t="0x"){let i;if(typeof n=="string"&&(i=async()=>{const r=this.calculateMessageHash(n);return await this.isMessageHashSigned(r,t)}),Y(n)&&(i=async()=>{const r=this.calculateTypedMessageHash(n);return await this.isMessageHashSigned(r,t)}),i)return await i();throw new Error("Invalid message type")}async isMessageHashSigned(n,t="0x"){const i=[this.check1271Signature.bind(this),this.check1271SignatureBytes.bind(this)];for(const r of i)if(await r(n,t))return!0;return!1}async getEnvironmentInfo(){return(await this.communicator.send(E.getEnvironmentInfo,void 0)).data}async requestAddressBook(){return(await this.communicator.send(E.requestAddressBook,void 0)).data}}Ln([Mn()],ue.prototype,"requestAddressBook",null);class Bn{constructor(n={}){const{allowedDomains:t=null,debug:i=!1}=n;this.communicator=new yn(t,i),this.eth=new wn(this.communicator),this.txs=new Dn(this.communicator),this.safe=new ue(this.communicator),this.wallet=new oe(this.communicator)}}const Un=Bn,jn=b.Operation,Gn=b.TokenType,Vn=b.TransactionStatus,Wn=b.TransferDirection;export{P as MessageFormatter,E as Methods,jn as Operation,_ as RPC_CALLS,U as RestrictedMethods,Gn as TokenType,Vn as TransactionStatus,Wn as TransferDirection,Un as default,hn as getSDKVersion,Y as isObjectEIP712TypedData};