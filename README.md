# T3 Stack with tRPC and Effect integration

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app` that contains the necessary building blocks for a tRPC and Effect Fullstack application.

## What's changed from the original t3 stack template?

I've tried to maintain the same FE behavior as the original template to avoid inconsistencies or too much refactoring.

Effect was added on the tRPC server side and there's also a new folder **features** for any feature meant to assist any router. In this template, we already introduce a feature called **post** which contains a service and a schema for the post feature all written in **Effect**.

**Zod** was removed from the project and **Effect Schema** was used instead.

## What's next?

I'll be updating this repo every time I find something useful to add or improve.

In the meantime you can clone this repo and start using it freely!
