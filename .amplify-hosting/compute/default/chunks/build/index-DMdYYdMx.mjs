import { ref, reactive, withCtx, unref, createTextVNode, openBlock, createBlock, toDisplayString, createCommentVNode, createVNode, useSSRContext } from 'vue';
import { useRouter } from 'vue-router';
import { a as useStore, V as VBtn, b as useRuntimeConfig, u as useNuxtApp } from './server.mjs';
import { useSnackbar } from 'vue3-snackbar';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { useVuelidate } from '@vuelidate/core';
import { required, email, minLength } from '@vuelidate/validators';
import { V as VCard, a as VTextField } from './VTextField-Dw32FTsB.mjs';
import '../../index.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'node:fs';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'devalue';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import '@tanstack/vue-query';
import './forwardRefs-CbdZEUR7.mjs';

const useDevice = () => {
  return useNuxtApp().$device;
};
const useOs = () => {
  const device = useDevice();
  let devicename = "";
  if (device.isMacOS) {
    devicename = "MacOS";
  } else if (device.isWindows) {
    devicename = "Windows";
  } else if (device.isIos) {
    devicename = "iOS";
  } else if (device.isAndroid) {
    devicename = "Android";
  } else {
    return "Unknown";
  }
  if (device.isChrome) {
    return devicename + " Chrome";
  } else if (device.isFirefox) {
    return devicename + " Firefox";
  } else if (device.isSafari) {
    return devicename + " Safari";
  } else if (device.isEdge) {
    return devicename + " Edge";
  } else {
    return devicename + " Unknown";
  }
};
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const visible = ref(false);
    const loading = ref(false);
    const authError = ref("");
    const device = useOs();
    useStore();
    useRouter();
    const snackbar = useSnackbar();
    const config = useRuntimeConfig();
    config.public.baseUrl;
    snackbar.clear();
    const initialState = {
      email: "",
      password: "",
      device
    };
    const state = reactive({
      ...initialState
    });
    const rules = {
      email: { required, email },
      password: { required, minLength: minLength(5) }
    };
    const v$ = useVuelidate(rules, state);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<form${ssrRenderAttrs(_attrs)}><div class="mt-12 pt-12">`);
      _push(ssrRenderComponent(VCard, {
        class: "mx-auto pa-12 pb-8",
        elevation: "8",
        "max-width": "448",
        rounded: "lg"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (authError.value) {
              _push2(`<p class="text-h6 text-error"${_scopeId}>${ssrInterpolate(authError.value)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="text-subtitle-1 text-medium-emphasis"${_scopeId}>Account</div>`);
            _push2(ssrRenderComponent(VTextField, {
              density: "compact",
              placeholder: "Email address",
              "prepend-inner-icon": "mdi-email-outline",
              variant: "outlined",
              modelValue: state.email,
              "onUpdate:modelValue": ($event) => state.email = $event,
              "error-messages": unref(v$).email.$errors.map((e) => e.$message),
              onBlur: unref(v$).email.$touch,
              onInput: unref(v$).email.$touch
            }, null, _parent2, _scopeId));
            _push2(`<div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between"${_scopeId}> Password </div>`);
            _push2(ssrRenderComponent(VTextField, {
              "append-inner-icon": visible.value ? "mdi-eye-off" : "mdi-eye",
              type: visible.value ? "text" : "password",
              density: "compact",
              placeholder: "Enter your password",
              "prepend-inner-icon": "mdi-lock-outline",
              variant: "outlined",
              "onClick:appendInner": ($event) => visible.value = !visible.value,
              modelValue: state.password,
              "onUpdate:modelValue": ($event) => state.password = $event,
              "error-messages": unref(v$).password.$errors.map((e) => e.$message),
              onBlur: unref(v$).password.$touch,
              onInput: unref(v$).password.$touch
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(VBtn, {
              class: "mb-8",
              color: "primary",
              size: "large",
              block: "",
              type: "submit",
              loading: loading.value,
              disabled: loading.value
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Log In `);
                } else {
                  return [
                    createTextVNode(" Log In ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              authError.value ? (openBlock(), createBlock("p", {
                key: 0,
                class: "text-h6 text-error"
              }, toDisplayString(authError.value), 1)) : createCommentVNode("", true),
              createVNode("div", { class: "text-subtitle-1 text-medium-emphasis" }, "Account"),
              createVNode(VTextField, {
                density: "compact",
                placeholder: "Email address",
                "prepend-inner-icon": "mdi-email-outline",
                variant: "outlined",
                modelValue: state.email,
                "onUpdate:modelValue": ($event) => state.email = $event,
                "error-messages": unref(v$).email.$errors.map((e) => e.$message),
                onBlur: unref(v$).email.$touch,
                onInput: unref(v$).email.$touch
              }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"]),
              createVNode("div", { class: "text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between" }, " Password "),
              createVNode(VTextField, {
                "append-inner-icon": visible.value ? "mdi-eye-off" : "mdi-eye",
                type: visible.value ? "text" : "password",
                density: "compact",
                placeholder: "Enter your password",
                "prepend-inner-icon": "mdi-lock-outline",
                variant: "outlined",
                "onClick:appendInner": ($event) => visible.value = !visible.value,
                modelValue: state.password,
                "onUpdate:modelValue": ($event) => state.password = $event,
                "error-messages": unref(v$).password.$errors.map((e) => e.$message),
                onBlur: unref(v$).password.$touch,
                onInput: unref(v$).password.$touch
              }, null, 8, ["append-inner-icon", "type", "onClick:appendInner", "modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"]),
              createVNode(VBtn, {
                class: "mb-8",
                color: "primary",
                size: "large",
                block: "",
                type: "submit",
                loading: loading.value,
                disabled: loading.value
              }, {
                default: withCtx(() => [
                  createTextVNode(" Log In ")
                ]),
                _: 1
              }, 8, ["loading", "disabled"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></form>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/login/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-DMdYYdMx.mjs.map
