# Midi to HUE

NestJS Server for Midi message translation to Philips HUE

# Configuration

## Allow usage of self-signed certificates

In `package.json`

``` json
"test": "NODE_TLS_REJECT_UNAUTHORIZED=0 jest",
```

## Curl statement as an example

``` bash

curl -k -X PUT 'https://{{ip}}/clip/v2/resource/light/0018a92e-ba65-4ea3-8abf-91043a1f4b1c' \
-H "Content-Type":"application/json" \
-H "hue-application-key":"{{key}}" \
--data '{"on":{"on":false}}'

```
