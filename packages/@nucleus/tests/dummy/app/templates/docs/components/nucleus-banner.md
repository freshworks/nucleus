
# Banner
```sh
yarn add @freshworks/banner
```
Banners display information at the top of the screen and alert the user about effects on further usage of the product due to a particular activity, functionality or product-wide status information.
<!-- ![Button screenshots](../../images/buttons.png) -->

## Usage

Add `{{nucleus-banner}}` to your __application.hbs__.

#### 1. Simple banners:

{{nucleus-banner/demo-1}}

#### 2. Custom component banners:

This makes use of the __component helper__, allowing the template that ultimately renders the banner to be dynamic:

{{nucleus-banner/demo-2}}

{{docs-note}}
