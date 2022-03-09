---
title: How to provide configs to React on Phoenix and esbuild
date: 2022-02-18
tags:
  - elixir
  - phoenix
layout: post
---

I've seen a few blog posts about using environment variables on React/Vue/etc when they're part of a Phoenix app using webpack, but I didn't find much content about using esbuild. This post is about providing configs to your front-end when using esbuild.

## Where to save configs

On `config/dev.ex` you can set arbitrary configs to make them available to your application. You can also import other configs from other files that might not get committed like this:

```elixir
# config/dev.ex

import_config "dev.secret.exs"
```

Then you can add `dev.secrets.exs` to your `.gitignore` and write down your configs there.

```elixir
# config/dev.secret.exs

config :my_app,
  public_key: "you can write your key here",
  secret_key: "you can write your key here"
```

Note: You can also get these keys from the environment using `System.fetch_env!("NAME_OF_YOUR_ENV_VAR")` if you prefer, but it sounds like this is not the Elixir way of doing these things because it doesn't work well with all configuration scenarios (dev/prod/runtime/etc). More details on [this thread](https://groups.google.com/g/elixir-lang-core/c/SLlJxiMa-7Q/m/Un1bTb2XLzsJ?pli=1).

## Providing configs to your front-end

You don't need to change your esbuild configuration to provide keys to your front-end. The trick here is to create a JavaScript object on your `root.html.heex` to make **public keys** available before the the front-end loads.

NOTE: Don't provide your **private/secret keys** to your front-end.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <!-- ... -->
    <script type="text/javascript">
      var PUBLIC_CONFIGS = {
        public_key: "<%= Application.fetch_env!(:my_app, :public_key) %>",
      }
    </script>
  </head>
  <body>
    <!-- ... -->
  </body>
</html>
```

## Using it in your front-end

With that you have a `PUBLIC_CONFIGS` object available to use anywhere in your front-end. Here is an example using a component from the [react-google-invisible-recaptcha](https://www.npmjs.com/package/react-google-invisible-recaptcha) package:

```jsx
<Recaptcha
  onResolved={() => { }}
  ref={refRecaptcha}
  sitekey={PUBLIC_CONFIGS.public_key} // here is your key
/>
```

----

This approach is something I had to figure out by myself for a project, do you have a better idea about how to do the same? Please let me know in the comments. Thanks.
