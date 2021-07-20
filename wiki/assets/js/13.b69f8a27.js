(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{378:function(t,a,s){"use strict";s.r(a);var n=s(44),e=Object(n.a)({},(function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"initializing-loki"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#initializing-loki"}},[t._v("#")]),t._v(" Initializing Loki")]),t._v(" "),s("h2",{attrs:{id:"configuration-for-dev"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#configuration-for-dev"}},[t._v("#")]),t._v(" Configuration for dev")]),t._v(" "),s("p",[t._v("Note that configuration is only necessary when your code is not running in a Sapling cloud environment. For example, a front-end app that is deployed to a Sapling-hosted cloud with the appropriate "),s("code",[t._v("head")]),t._v(" will load Loki jQuery and configure the environment without any additional setup. One helpful pattern is to wrap your configuration in a conditional such that it will only run in development mode and not in production. Here is an example from a Vue-based Vite project:")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("meta"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("env"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token constant"}},[t._v("MODE")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("===")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'development'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// your development mode configuration setup")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("else")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// any other setup code for production")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("p",[t._v("Implementation may vary in other frameworks.")]),t._v(" "),s("h2",{attrs:{id:"defining-your-config-object"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#defining-your-config-object"}},[t._v("#")]),t._v(" Defining your config object")]),t._v(" "),s("p",[t._v("Once you've imported "),s("code",[t._v("loki-javascript-client")]),t._v(" into your project (typically as "),s("code",[t._v("Loki")]),t._v("), you will need to initialize an instance of the Loki client. This is done by defining a config object and passing that object to the Loki class constructor:")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" Loki "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'../node_modules/@sapling-data/loki-javascript-client/dist/es-bundle'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" lokiConfig "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  baseUrl"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  appName"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  cloudPrefix"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  auth"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    username"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    password"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" loki "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Loki")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("lokiConfig"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// or for the browser:")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// window.loki = new Loki(lokiConfig);")]),t._v("\n")])])]),s("div",{staticClass:"custom-block tip"},[s("p",{staticClass:"custom-block-title"},[t._v("TIP")]),t._v(" "),s("p",[t._v("If you are writing code for the browser, it is recommended that you assign your new Loki instance to "),s("code",[t._v("window.loki")]),t._v(". This allows you to declare "),s("code",[t._v("loki")]),t._v(" as a global variable and eliminates the need for syntax such as "),s("code",[t._v("this.loki...")]),t._v(" or similar. This keeps Loki calls consistent between your local dev environment and your deployed production code.")])]),t._v(" "),s("p",[t._v("It is "),s("strong",[t._v("recommended")]),t._v(" that you "),s("RouterLink",{attrs:{to:"/configuration/package-json-template.html"}},[t._v("use your project's "),s("code",[t._v("package.json")]),t._v(" file")]),t._v(" to store these options and then reference those variables rather than defining these options in your JavaScript itself, e.g.,")],1),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" packageJson "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'../package.json'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("...")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" lokiConfig "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("...")]),t._v("baseUrl"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token template-string"}},[s("span",{pre:!0,attrs:{class:"token template-punctuation string"}},[t._v("`")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("https://")]),s("span",{pre:!0,attrs:{class:"token interpolation"}},[s("span",{pre:!0,attrs:{class:"token interpolation-punctuation punctuation"}},[t._v("${")]),t._v("packageJson"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("appInfo"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("loki"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("cloudPrefix"),s("span",{pre:!0,attrs:{class:"token interpolation-punctuation punctuation"}},[t._v("}")])]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v(".saplingdata.com")]),s("span",{pre:!0,attrs:{class:"token template-punctuation string"}},[t._v("`")])]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("h2",{attrs:{id:"options"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#options"}},[t._v("#")]),t._v(" Options")]),t._v(" "),s("h3",{attrs:{id:"baseurl"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#baseurl"}},[t._v("#")]),t._v(" baseUrl")]),t._v(" "),s("p",[t._v("This is the base URL that will be used for calls to Loki. It will typically look similar to the following: "),s("code",[t._v("https://cloudPrefix.saplingdata.com")]),t._v(".")]),t._v(" "),s("h3",{attrs:{id:"appname"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#appname"}},[t._v("#")]),t._v(" appName")]),t._v(" "),s("p",[t._v("This is a string containing the codename of application you are working with.")]),t._v(" "),s("h3",{attrs:{id:"cloudprefix"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#cloudprefix"}},[t._v("#")]),t._v(" cloudPrefix")]),t._v(" "),s("p",[t._v("This is a string containing the subdomain of the cloud environment you are working with.")]),t._v(" "),s("h3",{attrs:{id:"auth"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#auth"}},[t._v("#")]),t._v(" auth")]),t._v(" "),s("p",[t._v("This option requires two properties, "),s("code",[t._v("username")]),t._v(" and "),s("code",[t._v("password")]),t._v(". These properties must be strings that contain the username and password for the user account that you will be using to authorize your calls to Loki.")]),t._v(" "),s("div",{staticClass:"custom-block danger"},[s("p",{staticClass:"custom-block-title"},[t._v("WARNING")]),t._v(" "),s("p",[s("strong",[t._v("Do not store these credentials as plain text in your JavaScript")]),t._v("."),s("br"),t._v("\nDefine auth credentials in environment variables so that no user credentials are stored directly in your JavaScript. Use a "),s("code",[t._v(".env")]),t._v(" file with a library such as "),s("a",{attrs:{href:"https://github.com/motdotla/dotenv#readme",target:"_blank",rel:"noopener noreferrer"}},[t._v("dotenv"),s("OutboundLink")],1),t._v(" in Node or syntax such as "),s("code",[t._v("import.meta.env")]),t._v(" in Vite (or the equivalent in your framework of choice)."),s("br"),t._v(" "),s("strong",[t._v("Do not check your .env file into version control under any circumstances")]),t._v(".")])])])}),[],!1,null,null,null);a.default=e.exports}}]);