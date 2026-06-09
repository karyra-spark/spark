# Public Security Notes

Karyra Spark is a public beta frontend for a readiness gateway. It is designed to teach safety before users interact with higher-risk Web3 actions.

## What Spark Does Not Do

The Spark frontend does not:

- ask for seed phrases;
- ask for private keys;
- store wallet credentials;
- perform onchain writes;
- mint tokens or NFTs;
- execute live financial actions;
- provide trading or investment advice;
- expose public Studio/admin writer routes.

## What Spark May Do

Spark may:

- display educational wallet-safety content;
- simulate learning and lab activities;
- show readiness status;
- display a Readiness Passport;
- send users to Hub resources;
- call the Spark backend API for normal app behavior.

## Environment Safety

All variables beginning with `PUBLIC_` are exposed to the browser.

Never store secrets in:

```text
PUBLIC_SPARK_APP_URL
PUBLIC_SPARK_API_URL
PUBLIC_SPARK_HUB_URL
```

Do not commit `.env` files.

Commit only `.env.example`.

## Public Surface Cleanup

The public repo should not contain:

```text
pass-*.zip
pass-* folders
.pass-backups
*.bak
helper.txt
scratch files
private grant notes
server credentials
```

## Beta Limitations

Spark is currently:

```text
BETA 0.1
```

The product is live and usable for review, but still early-stage. Some Starknet integrations are expected to roll out progressively through Spark and Hub milestones.

## Responsible Handling

If a security issue is found:

1. Do not publish exploit details.
2. Report the affected route/component.
3. Include reproduction steps.
4. Include impact assessment when possible.
5. Avoid sharing real user data or credentials.
