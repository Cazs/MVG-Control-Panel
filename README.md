<p align="center">
  <img src="./static/images/logo.tif" alt="MVG Control Panel Logo" width="180" height="auto"/>
</p>

<h2>
  MVG Control Panel
  <a href="https://github.com/Cazs/mvg-control-panel/releases">
    <img src="https://img.shields.io/badge/version-1.1.4-green.svg" alt="v1.1.4">
  </a>
</h2>

MVG Control Panel is a tool to manage MVG's business operations such as handling transport and accommodation enquiries, managing quoting and invoicing, CRM and scheduling of transport services and other travel arrangements made through the MVG ecosystem.
Project originally forked off https://github.com/hql287/Manta

<a href="#screenshots">Screenshots</a> •
<a href="#features">Features</a> •
<a href="#downloads">Downloads</a> •
<a href="#technologies">Technologies</a> •
<a href="#why">Why?</a> •
<a href="#goals">Goals</a> •
<a href="#development">Development</a> •
<a href="#faq">FAQ</a> •
<a href="#acknowledgement">Acknowledgement</a>

### Screenshots

### Features
* 🚀 Fast!!!
* 👍 Friendly UI & UX
* 📐 Use SVGs for logo for better printing.
* 🏷 Custom statuses for invoices.
* 📊 Export PDF for print or email.
* 🔒 Complete Privacy & Security of your data.
* 💯 Built using the latest web technologies from Google.

### Downloads

macOS | Windows | Linux
-----------------| ---| ---|

[More Download Options](https://github.com/Cazs/mvg-control-panel/releases)

#### Supported Platforms
Following platforms are supported by Electron:

**macOS**
The minimum version supported is macOS 10.9.

**Windows**
Windows 7 and later are supported

**Linux:**

- Ubuntu 12.04 and later
- Fedora 21
- Debian 8

[More information](https://github.com/electron/electron/blob/master/docs/tutorial/supported-platforms.md).

Note that on Linux, some users might experience a GPU bug where the select options rendered as a black box, see [issue #128 of Manta](https://github.com/hql287/Manta/pull/128) and [issue #4322 of Electron](https://github.com/electron/electron/issues/4322). This can be fixed by disabling hardware acceleration like so:

# ```sh
# manta --disable-hardware-acceleration
# ```

> Remember that doing this might lead to some degradation of the app's performance. This is why "the fix" is not included by default.

### Technologies
* [Electron](https://github.com/electron/electron)
* [React](https://github.com/facebook/react)
* [Redux](https://github.com/reactjs/redux)
* [React-DnD](https://github.com/react-dnd/react-dnd)
* [React-Beautiful-DnD](https://github.com/atlassian/react-beautiful-dnd)
* [React-Motion](https://github.com/chenglou/react-motion)
* [Webpack](https://github.com/webpack/webpack)