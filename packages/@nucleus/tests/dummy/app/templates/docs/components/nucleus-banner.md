# Banner

```sh
ember install @freshworks/banner
```

Banners display information at the top of the screen and alert the user about effects on further usage of the product due to a particular activity, functionality or product-wide status information.

## Usage

Add `{{nucleus-banner}}` to your __application.hbs__.

#### 1. Simple banners:

{{nucleus-banner/demo-1}}

#### 2. Custom component banners:

This makes use of the __component helper__, allowing the template that ultimately renders the banner to be dynamic:

{{nucleus-banner/demo-2}}

## Guidelines

✅**Do's** 

When more than one notification, use inline messages instead stacking multiple banners (Refer the image above)

🚫**Dont's**

Don’t use banners for success messages. Refer notifications section for such scenarios.

{{docs-note}}
