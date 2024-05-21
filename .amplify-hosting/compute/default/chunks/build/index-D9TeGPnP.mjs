import { d as propsFactory, g as genericComponent, T as useProxiedModel, c as useRender, j as VDefaultsProvider, a4 as Intersect, a5 as filterInputAttrs, a as useStore, h as VIcon, ab as VProgressCircular, a6 as callEvent, Z as convertToUnit, b as useRuntimeConfig, aa as TOKEN_KEY, a9 as clamp, V as VBtn } from './server.mjs';
import { useSnackbar } from 'vue3-snackbar';
import { ref, watch, nextTick, mergeProps, createVNode, computed, shallowRef, watchEffect, Fragment, withDirectives, resolveDirective, vModelText, withCtx, createTextVNode, useSSRContext, reactive, unref, withModifiers, openBlock, createBlock, createCommentVNode } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle, ssrRenderList } from 'vue/server-renderer';
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { m as makeVOverlayProps, V as VDialogTransition, u as useScopeId, a as VOverlay } from './VOverlay-BR42mW3t.mjs';
import { f as forwardRefs } from './forwardRefs-CbdZEUR7.mjs';
import { m as makeVInputProps, b as makeVFieldProps, u as useFocus, c as VInput, f as filterFieldProps, d as VField, e as VCounter, V as VCard, a as VTextField } from './VTextField-Dw32FTsB.mjs';
import { useRouter } from 'vue-router';
import { u as useHead } from './index-BabADJUJ.mjs';
import axios from 'axios';
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

const makeVDialogProps = propsFactory({
  fullscreen: Boolean,
  retainFocus: {
    type: Boolean,
    default: true
  },
  scrollable: Boolean,
  ...makeVOverlayProps({
    origin: "center center",
    scrollStrategy: "block",
    transition: {
      component: VDialogTransition
    },
    zIndex: 2400
  })
}, "VDialog");
const VDialog = genericComponent()({
  name: "VDialog",
  props: makeVDialogProps(),
  emits: {
    "update:modelValue": (value) => true,
    afterLeave: () => true
  },
  setup(props, _ref) {
    let {
      emit,
      slots
    } = _ref;
    const isActive = useProxiedModel(props, "modelValue");
    const {
      scopeId
    } = useScopeId();
    const overlay = ref();
    function onAfterEnter() {
      var _a;
      if (((_a = overlay.value) == null ? void 0 : _a.contentEl) && !overlay.value.contentEl.contains((void 0).activeElement)) {
        overlay.value.contentEl.focus({
          preventScroll: true
        });
      }
    }
    function onAfterLeave() {
      emit("afterLeave");
    }
    watch(isActive, async (val) => {
      var _a;
      if (!val) {
        await nextTick();
        (_a = overlay.value.activatorEl) == null ? void 0 : _a.focus({
          preventScroll: true
        });
      }
    });
    useRender(() => {
      const overlayProps = VOverlay.filterProps(props);
      const activatorProps = mergeProps({
        "aria-haspopup": "dialog",
        "aria-expanded": String(isActive.value)
      }, props.activatorProps);
      const contentProps = mergeProps({
        tabindex: -1
      }, props.contentProps);
      return createVNode(VOverlay, mergeProps({
        "ref": overlay,
        "class": ["v-dialog", {
          "v-dialog--fullscreen": props.fullscreen,
          "v-dialog--scrollable": props.scrollable
        }, props.class],
        "style": props.style
      }, overlayProps, {
        "modelValue": isActive.value,
        "onUpdate:modelValue": ($event) => isActive.value = $event,
        "aria-modal": "true",
        "activatorProps": activatorProps,
        "contentProps": contentProps,
        "role": "dialog",
        "onAfterEnter": onAfterEnter,
        "onAfterLeave": onAfterLeave
      }, scopeId), {
        activator: slots.activator,
        default: function() {
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          return createVNode(VDefaultsProvider, {
            "root": "VDialog"
          }, {
            default: () => {
              var _a;
              return [(_a = slots.default) == null ? void 0 : _a.call(slots, ...args)];
            }
          });
        }
      });
    });
    return forwardRefs({}, overlay);
  }
});
const makeVTextareaProps = propsFactory({
  autoGrow: Boolean,
  autofocus: Boolean,
  counter: [Boolean, Number, String],
  counterValue: Function,
  prefix: String,
  placeholder: String,
  persistentPlaceholder: Boolean,
  persistentCounter: Boolean,
  noResize: Boolean,
  rows: {
    type: [Number, String],
    default: 5,
    validator: (v) => !isNaN(parseFloat(v))
  },
  maxRows: {
    type: [Number, String],
    validator: (v) => !isNaN(parseFloat(v))
  },
  suffix: String,
  modelModifiers: Object,
  ...makeVInputProps(),
  ...makeVFieldProps()
}, "VTextarea");
const VTextarea = genericComponent()({
  name: "VTextarea",
  directives: {
    Intersect
  },
  inheritAttrs: false,
  props: makeVTextareaProps(),
  emits: {
    "click:control": (e) => true,
    "mousedown:control": (e) => true,
    "update:focused": (focused) => true,
    "update:modelValue": (val) => true
  },
  setup(props, _ref) {
    let {
      attrs,
      emit,
      slots
    } = _ref;
    const model = useProxiedModel(props, "modelValue");
    const {
      isFocused,
      focus,
      blur
    } = useFocus(props);
    const counterValue = computed(() => {
      return typeof props.counterValue === "function" ? props.counterValue(model.value) : (model.value || "").toString().length;
    });
    const max = computed(() => {
      if (attrs.maxlength)
        return attrs.maxlength;
      if (!props.counter || typeof props.counter !== "number" && typeof props.counter !== "string")
        return void 0;
      return props.counter;
    });
    function onIntersect(isIntersecting, entries) {
      var _a, _b;
      if (!props.autofocus || !isIntersecting)
        return;
      (_b = (_a = entries[0].target) == null ? void 0 : _a.focus) == null ? void 0 : _b.call(_a);
    }
    const vInputRef = ref();
    const vFieldRef = ref();
    const controlHeight = shallowRef("");
    const textareaRef = ref();
    const isActive = computed(() => props.persistentPlaceholder || isFocused.value || props.active);
    function onFocus() {
      var _a;
      if (textareaRef.value !== (void 0).activeElement) {
        (_a = textareaRef.value) == null ? void 0 : _a.focus();
      }
      if (!isFocused.value)
        focus();
    }
    function onControlClick(e) {
      onFocus();
      emit("click:control", e);
    }
    function onControlMousedown(e) {
      emit("mousedown:control", e);
    }
    function onClear(e) {
      e.stopPropagation();
      onFocus();
      nextTick(() => {
        model.value = "";
        callEvent(props["onClick:clear"], e);
      });
    }
    function onInput(e) {
      var _a;
      const el = e.target;
      model.value = el.value;
      if ((_a = props.modelModifiers) == null ? void 0 : _a.trim) {
        const caretPosition = [el.selectionStart, el.selectionEnd];
        nextTick(() => {
          el.selectionStart = caretPosition[0];
          el.selectionEnd = caretPosition[1];
        });
      }
    }
    const sizerRef = ref();
    const rows = ref(+props.rows);
    const isPlainOrUnderlined = computed(() => ["plain", "underlined"].includes(props.variant));
    watchEffect(() => {
      if (!props.autoGrow)
        rows.value = +props.rows;
    });
    function calculateInputHeight() {
      if (!props.autoGrow)
        return;
      nextTick(() => {
        if (!sizerRef.value || !vFieldRef.value)
          return;
        const style = getComputedStyle(sizerRef.value);
        const fieldStyle = getComputedStyle(vFieldRef.value.$el);
        const padding = parseFloat(style.getPropertyValue("--v-field-padding-top")) + parseFloat(style.getPropertyValue("--v-input-padding-top")) + parseFloat(style.getPropertyValue("--v-field-padding-bottom"));
        const height = sizerRef.value.scrollHeight;
        const lineHeight = parseFloat(style.lineHeight);
        const minHeight = Math.max(parseFloat(props.rows) * lineHeight + padding, parseFloat(fieldStyle.getPropertyValue("--v-input-control-height")));
        const maxHeight = parseFloat(props.maxRows) * lineHeight + padding || Infinity;
        const newHeight = clamp(height != null ? height : 0, minHeight, maxHeight);
        rows.value = Math.floor((newHeight - padding) / lineHeight);
        controlHeight.value = convertToUnit(newHeight);
      });
    }
    watch(model, calculateInputHeight);
    watch(() => props.rows, calculateInputHeight);
    watch(() => props.maxRows, calculateInputHeight);
    watch(() => props.density, calculateInputHeight);
    let observer;
    watch(sizerRef, (val) => {
      if (val) {
        observer = new ResizeObserver(calculateInputHeight);
        observer.observe(sizerRef.value);
      } else {
        observer == null ? void 0 : observer.disconnect();
      }
    });
    useRender(() => {
      const hasCounter = !!(slots.counter || props.counter || props.counterValue);
      const hasDetails = !!(hasCounter || slots.details);
      const [rootAttrs, inputAttrs] = filterInputAttrs(attrs);
      const {
        modelValue: _,
        ...inputProps
      } = VInput.filterProps(props);
      const fieldProps = filterFieldProps(props);
      return createVNode(VInput, mergeProps({
        "ref": vInputRef,
        "modelValue": model.value,
        "onUpdate:modelValue": ($event) => model.value = $event,
        "class": ["v-textarea v-text-field", {
          "v-textarea--prefixed": props.prefix,
          "v-textarea--suffixed": props.suffix,
          "v-text-field--prefixed": props.prefix,
          "v-text-field--suffixed": props.suffix,
          "v-textarea--auto-grow": props.autoGrow,
          "v-textarea--no-resize": props.noResize || props.autoGrow,
          "v-input--plain-underlined": isPlainOrUnderlined.value
        }, props.class],
        "style": props.style
      }, rootAttrs, inputProps, {
        "centerAffix": rows.value === 1 && !isPlainOrUnderlined.value,
        "focused": isFocused.value
      }), {
        ...slots,
        default: (_ref2) => {
          let {
            id,
            isDisabled,
            isDirty,
            isReadonly,
            isValid
          } = _ref2;
          return createVNode(VField, mergeProps({
            "ref": vFieldRef,
            "style": {
              "--v-textarea-control-height": controlHeight.value
            },
            "onClick": onControlClick,
            "onMousedown": onControlMousedown,
            "onClick:clear": onClear,
            "onClick:prependInner": props["onClick:prependInner"],
            "onClick:appendInner": props["onClick:appendInner"]
          }, fieldProps, {
            "id": id.value,
            "active": isActive.value || isDirty.value,
            "centerAffix": rows.value === 1 && !isPlainOrUnderlined.value,
            "dirty": isDirty.value || props.dirty,
            "disabled": isDisabled.value,
            "focused": isFocused.value,
            "error": isValid.value === false
          }), {
            ...slots,
            default: (_ref3) => {
              let {
                props: {
                  class: fieldClass,
                  ...slotProps
                }
              } = _ref3;
              return createVNode(Fragment, null, [props.prefix && createVNode("span", {
                "class": "v-text-field__prefix"
              }, [props.prefix]), withDirectives(createVNode("textarea", mergeProps({
                "ref": textareaRef,
                "class": fieldClass,
                "value": model.value,
                "onInput": onInput,
                "autofocus": props.autofocus,
                "readonly": isReadonly.value,
                "disabled": isDisabled.value,
                "placeholder": props.placeholder,
                "rows": props.rows,
                "name": props.name,
                "onFocus": onFocus,
                "onBlur": blur
              }, slotProps, inputAttrs), null), [[resolveDirective("intersect"), {
                handler: onIntersect
              }, null, {
                once: true
              }]]), props.autoGrow && withDirectives(createVNode("textarea", {
                "class": [fieldClass, "v-textarea__sizer"],
                "id": `${slotProps.id}-sizer`,
                "onUpdate:modelValue": ($event) => model.value = $event,
                "ref": sizerRef,
                "readonly": true,
                "aria-hidden": "true"
              }, null), [[vModelText, model.value]]), props.suffix && createVNode("span", {
                "class": "v-text-field__suffix"
              }, [props.suffix])]);
            }
          });
        },
        details: hasDetails ? (slotProps) => {
          var _a;
          return createVNode(Fragment, null, [(_a = slots.details) == null ? void 0 : _a.call(slots, slotProps), hasCounter && createVNode(Fragment, null, [createVNode("span", null, null), createVNode(VCounter, {
            "active": props.persistentCounter || isFocused.value,
            "value": counterValue.value,
            "max": max.value,
            "disabled": props.disabled
          }, slots.counter)])]);
        } : void 0
      });
    });
    return forwardRefs({}, vInputRef, vFieldRef, textareaRef);
  }
});
const _sfc_main$2 = {
  __name: "TodoCreate",
  __ssrInlineRender: true,
  emits: ["fetchAgain"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const createDialog = ref(false);
    const store = useStore();
    const config = useRuntimeConfig();
    const snackbar = useSnackbar();
    const baseUrl = config.public.baseUrl;
    const initialcreateState = {
      c_title: "",
      c_description: ""
    };
    const createState = reactive({
      ...initialcreateState
    });
    const createRules = {
      c_title: { required },
      c_description: { required }
    };
    const createv$ = useVuelidate(createRules, createState);
    const handleCreateSubmit = async () => {
      createv$.value.$touch();
      if (createv$.value.$invalid) {
        console.log("invalid");
        return;
      }
      await $fetch(
        `${baseUrl}/api/manage-todo`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": "Bearer " + localStorage.getItem(TOKEN_KEY)
          },
          body: {
            title: createState.c_title,
            description: createState.c_description
          }
        }
      ).then((res) => {
        var _a, _b;
        if (((_a = res.error) == null ? void 0 : _a.value) !== null && ((_b = res.error) == null ? void 0 : _b.value) !== void 0) {
          if (res.error.value.statusCode === 401) {
            store.logout();
            snackbar.add({
              type: "error",
              text: "Unauthorized"
            });
          }
        }
        snackbar.add({
          type: "success",
          text: "Todo created successfully"
        });
        createState.c_title = "";
        createState.c_description = "";
        createDialog.value = false;
        emit("fetchAgain");
      }).catch((err) => {
        console.log("todo update error", err);
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(VBtn, {
        color: "primary",
        onClick: ($event) => createDialog.value = true
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VIcon, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`mdi-plus`);
                } else {
                  return [
                    createTextVNode("mdi-plus")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`\xA0Add Todo `);
          } else {
            return [
              createVNode(VIcon, null, {
                default: withCtx(() => [
                  createTextVNode("mdi-plus")
                ]),
                _: 1
              }),
              createTextVNode("\xA0Add Todo ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(VDialog, {
        modelValue: createDialog.value,
        "onUpdate:modelValue": ($event) => createDialog.value = $event,
        width: "400px"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<form${_scopeId}>`);
            _push2(ssrRenderComponent(VCard, { "max-width": "400" }, {
              actions: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VBtn, {
                    text: "",
                    onClick: ($event) => createDialog.value = false
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VIcon, { color: "red" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`mdi-close`);
                            } else {
                              return [
                                createTextVNode("mdi-close")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`\xA0Cancel `);
                      } else {
                        return [
                          createVNode(VIcon, { color: "red" }, {
                            default: withCtx(() => [
                              createTextVNode("mdi-close")
                            ]),
                            _: 1
                          }),
                          createTextVNode("\xA0Cancel ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VBtn, {
                    text: "",
                    type: "submit"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VIcon, { color: "blue" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`mdi-check`);
                            } else {
                              return [
                                createTextVNode("mdi-check")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`\xA0Save `);
                      } else {
                        return [
                          createVNode(VIcon, { color: "blue" }, {
                            default: withCtx(() => [
                              createTextVNode("mdi-check")
                            ]),
                            _: 1
                          }),
                          createTextVNode("\xA0Save ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VBtn, {
                      text: "",
                      onClick: ($event) => createDialog.value = false
                    }, {
                      default: withCtx(() => [
                        createVNode(VIcon, { color: "red" }, {
                          default: withCtx(() => [
                            createTextVNode("mdi-close")
                          ]),
                          _: 1
                        }),
                        createTextVNode("\xA0Cancel ")
                      ]),
                      _: 1
                    }, 8, ["onClick"]),
                    createVNode(VBtn, {
                      text: "",
                      type: "submit"
                    }, {
                      default: withCtx(() => [
                        createVNode(VIcon, { color: "blue" }, {
                          default: withCtx(() => [
                            createTextVNode("mdi-check")
                          ]),
                          _: 1
                        }),
                        createTextVNode("\xA0Save ")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="pa-4"${_scopeId2}>`);
                  _push3(ssrRenderComponent(VTextField, {
                    modelValue: createState.c_title,
                    "onUpdate:modelValue": ($event) => createState.c_title = $event,
                    label: "Title",
                    "error-messages": unref(createv$).c_title.$errors.map((e) => e.$message),
                    onBlur: unref(createv$).c_title.$touch,
                    onInput: unref(createv$).c_title.$touch
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VTextarea, {
                    modelValue: createState.c_description,
                    "onUpdate:modelValue": ($event) => createState.c_description = $event,
                    label: "Description",
                    "error-messages": unref(createv$).c_description.$errors.map((e) => e.$message),
                    onBlur: unref(createv$).c_description.$touch,
                    onInput: unref(createv$).c_description.$touch
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "pa-4" }, [
                      createVNode(VTextField, {
                        modelValue: createState.c_title,
                        "onUpdate:modelValue": ($event) => createState.c_title = $event,
                        label: "Title",
                        "error-messages": unref(createv$).c_title.$errors.map((e) => e.$message),
                        onBlur: unref(createv$).c_title.$touch,
                        onInput: unref(createv$).c_title.$touch
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"]),
                      createVNode(VTextarea, {
                        modelValue: createState.c_description,
                        "onUpdate:modelValue": ($event) => createState.c_description = $event,
                        label: "Description",
                        "error-messages": unref(createv$).c_description.$errors.map((e) => e.$message),
                        onBlur: unref(createv$).c_description.$touch,
                        onInput: unref(createv$).c_description.$touch
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</form>`);
          } else {
            return [
              createVNode("form", {
                onSubmit: withModifiers(handleCreateSubmit, ["prevent"])
              }, [
                createVNode(VCard, { "max-width": "400" }, {
                  actions: withCtx(() => [
                    createVNode(VBtn, {
                      text: "",
                      onClick: ($event) => createDialog.value = false
                    }, {
                      default: withCtx(() => [
                        createVNode(VIcon, { color: "red" }, {
                          default: withCtx(() => [
                            createTextVNode("mdi-close")
                          ]),
                          _: 1
                        }),
                        createTextVNode("\xA0Cancel ")
                      ]),
                      _: 1
                    }, 8, ["onClick"]),
                    createVNode(VBtn, {
                      text: "",
                      type: "submit"
                    }, {
                      default: withCtx(() => [
                        createVNode(VIcon, { color: "blue" }, {
                          default: withCtx(() => [
                            createTextVNode("mdi-check")
                          ]),
                          _: 1
                        }),
                        createTextVNode("\xA0Save ")
                      ]),
                      _: 1
                    })
                  ]),
                  default: withCtx(() => [
                    createVNode("div", { class: "pa-4" }, [
                      createVNode(VTextField, {
                        modelValue: createState.c_title,
                        "onUpdate:modelValue": ($event) => createState.c_title = $event,
                        label: "Title",
                        "error-messages": unref(createv$).c_title.$errors.map((e) => e.$message),
                        onBlur: unref(createv$).c_title.$touch,
                        onInput: unref(createv$).c_title.$touch
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"]),
                      createVNode(VTextarea, {
                        modelValue: createState.c_description,
                        "onUpdate:modelValue": ($event) => createState.c_description = $event,
                        label: "Description",
                        "error-messages": unref(createv$).c_description.$errors.map((e) => e.$message),
                        onBlur: unref(createv$).c_description.$touch,
                        onInput: unref(createv$).c_description.$touch
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"])
                    ])
                  ]),
                  _: 1
                })
              ], 32)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/TodoCreate.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "TodoCard",
  __ssrInlineRender: true,
  props: ["todo"],
  emits: ["fetchAgain"],
  setup(__props, { emit: __emit }) {
    const { todo } = __props;
    const emit = __emit;
    const dialog = ref(false);
    const editmode = ref(false);
    const loading = ref(false);
    const config = useRuntimeConfig();
    const snackbar = useSnackbar();
    const store = useStore();
    const baseUrl = config.public.baseUrl;
    const initialState = {
      title: "",
      description: ""
    };
    const state = reactive({
      ...initialState
    });
    const rules = {
      title: { required },
      description: { required }
    };
    const v$ = useVuelidate(rules, state);
    const getTodos = async () => {
      emit("fetchAgain");
    };
    const handleEditMode = (todos) => {
      editmode.value = true;
      state.title = todos.title;
      state.description = todos.description;
    };
    const handleEditSubmit = async () => {
      loading.value = true;
      v$.value.$touch();
      if (v$.value.$invalid) {
        loading.value = false;
        return;
      }
      await $fetch(
        `${baseUrl}/api/manage-todo/${todo.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": "Bearer " + localStorage.getItem(TOKEN_KEY)
          },
          body: {
            title: state.title,
            description: state.description
          }
        }
      ).then((res) => {
        var _a, _b;
        if (((_a = res.error) == null ? void 0 : _a.value) !== null && ((_b = res.error) == null ? void 0 : _b.value) !== void 0) {
          if (res.error.value.statusCode === 401) {
            store.logout();
            snackbar.add({
              type: "error",
              text: "Unauthorized"
            });
          }
        }
        snackbar.add({
          type: "success",
          text: "Todo updated successfully"
        });
        loading.value = false;
        dialog.value = false;
        editmode.value = false;
        todo.title = state.title;
        todo.description = state.description;
      }).catch((err) => {
        loading.value = false;
        snackbar.add({
          type: "error",
          text: "Todo update failed"
        });
      });
    };
    const handleDeleteSubmit = async () => {
      loading.value = true;
      await $fetch(
        `${baseUrl}/api/manage-todo/${todo.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": "Bearer " + localStorage.getItem(TOKEN_KEY)
          }
        }
      ).then((res) => {
        var _a, _b;
        if (((_a = res.error) == null ? void 0 : _a.value) !== null && ((_b = res.error) == null ? void 0 : _b.value) !== void 0) {
          if (res.error.value.statusCode === 401) {
            store.logout();
            snackbar.add({
              type: "error",
              text: "Unauthorized"
            });
          }
        }
        snackbar.add({
          type: "success",
          text: "Todo deleted successfully"
        });
        loading.value = false;
        dialog.value = false;
        getTodos();
      }).catch((err) => {
        loading.value = false;
        snackbar.add({
          type: "error",
          text: "Todo delete failed"
        });
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><div>`);
      _push(ssrRenderComponent(VCard, {
        title: __props.todo.title,
        text: __props.todo.description,
        onClick: ($event) => dialog.value = true,
        class: "my-2"
      }, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(VDialog, {
        modelValue: dialog.value,
        "onUpdate:modelValue": ($event) => dialog.value = $event,
        width: "400px"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (!editmode.value) {
              _push2(ssrRenderComponent(VCard, {
                "max-width": "400",
                "prepend-icon": "mdi-update",
                text: __props.todo.description,
                title: __props.todo.title
              }, {
                actions: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(VBtn, {
                      text: "",
                      onClick: ($event) => handleEditMode(__props.todo)
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VIcon, { color: "blue" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`mdi-pencil`);
                              } else {
                                return [
                                  createTextVNode("mdi-pencil")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(`\xA0Edit `);
                        } else {
                          return [
                            createVNode(VIcon, { color: "blue" }, {
                              default: withCtx(() => [
                                createTextVNode("mdi-pencil")
                              ]),
                              _: 1
                            }),
                            createTextVNode("\xA0Edit ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(VBtn, {
                      text: "",
                      onClick: handleDeleteSubmit
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VIcon, { color: "red" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`mdi-delete`);
                              } else {
                                return [
                                  createTextVNode("mdi-delete")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(`\xA0Delete `);
                        } else {
                          return [
                            createVNode(VIcon, { color: "red" }, {
                              default: withCtx(() => [
                                createTextVNode("mdi-delete")
                              ]),
                              _: 1
                            }),
                            createTextVNode("\xA0Delete ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(VBtn, {
                      class: "ms-auto",
                      text: "Close",
                      onClick: ($event) => dialog.value = false,
                      color: "primary",
                      variant: "flat"
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(VBtn, {
                        text: "",
                        onClick: ($event) => handleEditMode(__props.todo)
                      }, {
                        default: withCtx(() => [
                          createVNode(VIcon, { color: "blue" }, {
                            default: withCtx(() => [
                              createTextVNode("mdi-pencil")
                            ]),
                            _: 1
                          }),
                          createTextVNode("\xA0Edit ")
                        ]),
                        _: 1
                      }, 8, ["onClick"]),
                      createVNode(VBtn, {
                        text: "",
                        onClick: handleDeleteSubmit
                      }, {
                        default: withCtx(() => [
                          createVNode(VIcon, { color: "red" }, {
                            default: withCtx(() => [
                              createTextVNode("mdi-delete")
                            ]),
                            _: 1
                          }),
                          createTextVNode("\xA0Delete ")
                        ]),
                        _: 1
                      }),
                      createVNode(VBtn, {
                        class: "ms-auto",
                        text: "Close",
                        onClick: ($event) => dialog.value = false,
                        color: "primary",
                        variant: "flat"
                      }, null, 8, ["onClick"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`<form${_scopeId}>`);
            if (editmode.value) {
              _push2(ssrRenderComponent(VCard, { "max-width": "400" }, {
                actions: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(VBtn, {
                      text: "",
                      onClick: ($event) => editmode.value = false
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VIcon, { color: "red" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`mdi-close`);
                              } else {
                                return [
                                  createTextVNode("mdi-close")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(`\xA0Cancel `);
                        } else {
                          return [
                            createVNode(VIcon, { color: "red" }, {
                              default: withCtx(() => [
                                createTextVNode("mdi-close")
                              ]),
                              _: 1
                            }),
                            createTextVNode("\xA0Cancel ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(VBtn, {
                      text: "",
                      type: "submit"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VIcon, { color: "blue" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`mdi-check`);
                              } else {
                                return [
                                  createTextVNode("mdi-check")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(`\xA0Save `);
                        } else {
                          return [
                            createVNode(VIcon, { color: "blue" }, {
                              default: withCtx(() => [
                                createTextVNode("mdi-check")
                              ]),
                              _: 1
                            }),
                            createTextVNode("\xA0Save ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(VBtn, {
                        text: "",
                        onClick: ($event) => editmode.value = false
                      }, {
                        default: withCtx(() => [
                          createVNode(VIcon, { color: "red" }, {
                            default: withCtx(() => [
                              createTextVNode("mdi-close")
                            ]),
                            _: 1
                          }),
                          createTextVNode("\xA0Cancel ")
                        ]),
                        _: 1
                      }, 8, ["onClick"]),
                      createVNode(VBtn, {
                        text: "",
                        type: "submit"
                      }, {
                        default: withCtx(() => [
                          createVNode(VIcon, { color: "blue" }, {
                            default: withCtx(() => [
                              createTextVNode("mdi-check")
                            ]),
                            _: 1
                          }),
                          createTextVNode("\xA0Save ")
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="pa-4"${_scopeId2}>`);
                    _push3(ssrRenderComponent(VTextField, {
                      modelValue: state.title,
                      "onUpdate:modelValue": ($event) => state.title = $event,
                      label: "Title",
                      width: "350",
                      "error-messages": unref(v$).title.$errors.map((e) => e.$message),
                      onBlur: unref(v$).title.$touch,
                      onInput: unref(v$).title.$touch
                    }, null, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(VTextarea, {
                      modelValue: state.description,
                      "onUpdate:modelValue": ($event) => state.description = $event,
                      label: "Description",
                      "error-messages": unref(v$).description.$errors.map((e) => e.$message),
                      onBlur: unref(v$).description.$touch,
                      onInput: unref(v$).description.$touch
                    }, null, _parent3, _scopeId2));
                    _push3(`</div>`);
                  } else {
                    return [
                      createVNode("div", { class: "pa-4" }, [
                        createVNode(VTextField, {
                          modelValue: state.title,
                          "onUpdate:modelValue": ($event) => state.title = $event,
                          label: "Title",
                          width: "350",
                          "error-messages": unref(v$).title.$errors.map((e) => e.$message),
                          onBlur: unref(v$).title.$touch,
                          onInput: unref(v$).title.$touch
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"]),
                        createVNode(VTextarea, {
                          modelValue: state.description,
                          "onUpdate:modelValue": ($event) => state.description = $event,
                          label: "Description",
                          "error-messages": unref(v$).description.$errors.map((e) => e.$message),
                          onBlur: unref(v$).description.$touch,
                          onInput: unref(v$).description.$touch
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"])
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</form>`);
          } else {
            return [
              !editmode.value ? (openBlock(), createBlock(VCard, {
                key: 0,
                "max-width": "400",
                "prepend-icon": "mdi-update",
                text: __props.todo.description,
                title: __props.todo.title
              }, {
                actions: withCtx(() => [
                  createVNode(VBtn, {
                    text: "",
                    onClick: ($event) => handleEditMode(__props.todo)
                  }, {
                    default: withCtx(() => [
                      createVNode(VIcon, { color: "blue" }, {
                        default: withCtx(() => [
                          createTextVNode("mdi-pencil")
                        ]),
                        _: 1
                      }),
                      createTextVNode("\xA0Edit ")
                    ]),
                    _: 1
                  }, 8, ["onClick"]),
                  createVNode(VBtn, {
                    text: "",
                    onClick: handleDeleteSubmit
                  }, {
                    default: withCtx(() => [
                      createVNode(VIcon, { color: "red" }, {
                        default: withCtx(() => [
                          createTextVNode("mdi-delete")
                        ]),
                        _: 1
                      }),
                      createTextVNode("\xA0Delete ")
                    ]),
                    _: 1
                  }),
                  createVNode(VBtn, {
                    class: "ms-auto",
                    text: "Close",
                    onClick: ($event) => dialog.value = false,
                    color: "primary",
                    variant: "flat"
                  }, null, 8, ["onClick"])
                ]),
                _: 1
              }, 8, ["text", "title"])) : createCommentVNode("", true),
              createVNode("form", {
                onSubmit: withModifiers(handleEditSubmit, ["prevent"])
              }, [
                editmode.value ? (openBlock(), createBlock(VCard, {
                  key: 0,
                  "max-width": "400"
                }, {
                  actions: withCtx(() => [
                    createVNode(VBtn, {
                      text: "",
                      onClick: ($event) => editmode.value = false
                    }, {
                      default: withCtx(() => [
                        createVNode(VIcon, { color: "red" }, {
                          default: withCtx(() => [
                            createTextVNode("mdi-close")
                          ]),
                          _: 1
                        }),
                        createTextVNode("\xA0Cancel ")
                      ]),
                      _: 1
                    }, 8, ["onClick"]),
                    createVNode(VBtn, {
                      text: "",
                      type: "submit"
                    }, {
                      default: withCtx(() => [
                        createVNode(VIcon, { color: "blue" }, {
                          default: withCtx(() => [
                            createTextVNode("mdi-check")
                          ]),
                          _: 1
                        }),
                        createTextVNode("\xA0Save ")
                      ]),
                      _: 1
                    })
                  ]),
                  default: withCtx(() => [
                    createVNode("div", { class: "pa-4" }, [
                      createVNode(VTextField, {
                        modelValue: state.title,
                        "onUpdate:modelValue": ($event) => state.title = $event,
                        label: "Title",
                        width: "350",
                        "error-messages": unref(v$).title.$errors.map((e) => e.$message),
                        onBlur: unref(v$).title.$touch,
                        onInput: unref(v$).title.$touch
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"]),
                      createVNode(VTextarea, {
                        modelValue: state.description,
                        "onUpdate:modelValue": ($event) => state.description = $event,
                        label: "Description",
                        "error-messages": unref(v$).description.$errors.map((e) => e.$message),
                        onBlur: unref(v$).description.$touch,
                        onInput: unref(v$).description.$touch
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"])
                    ])
                  ]),
                  _: 1
                })) : createCommentVNode("", true)
              ], 32)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/TodoCard.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const page = ref(1);
    const paginate = ref(10);
    const lastpage = ref(1);
    const loading = ref(false);
    const todos = ref(null);
    const store = useStore();
    const config = useRuntimeConfig();
    const router = useRouter();
    const baseUrl = config.public.baseUrl;
    const fetchData = async (setTodo = true, searchpage = 1, paginate2 = 10) => {
      if (setTodo) {
        loading.value = true;
      }
      await axios.get(`${baseUrl}/api/manage-todo`, {
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": "Bearer " + localStorage.getItem(TOKEN_KEY)
        },
        params: {
          paginate: paginate2.value,
          page: searchpage.value,
          search: ""
        }
      }).then((response) => {
        console.log("search page", searchpage);
        if (setTodo) {
          todos.value = response.data.data.data;
          lastpage.value = response.data.data.last_page;
          page.value = response.data.data.current_page;
        } else {
          todos.value = [...todos.value, ...response.data.data.data];
          lastpage.value = response.data.data.last_page;
          page.value = response.data.data.current_page;
        }
        loading.value = false;
      }).catch((err) => {
        if (err.response.status === 401) {
          store.logout();
          router.push("/login");
          return;
        }
      });
      loading.value = false;
    };
    fetchData(true, page, paginate);
    useHead({
      title: "Todo List",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "description", content: "Todo List all" }
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" }
      ]
    });
    (void 0).onscroll = function(ev) {
      if ((void 0).innerHeight + (void 0).scrollY + 600 >= (void 0).body.offsetHeight) {
        console.log("bottom");
        console.log("page", page.value);
        console.log("lastpage", lastpage.value);
        if (page.value < lastpage.value) {
          page.value = page.value + 1;
          fetchData(false, page, paginate);
        }
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_TodoCreate = _sfc_main$2;
      const _component_TodoCard = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="d-flex justify-content-between align-items-center"><div class="pb-5 me-auto"><h2>Todo</h2></div><div>`);
      _push(ssrRenderComponent(_component_TodoCreate, {
        onFetchAgain: ($event) => fetchData()
      }, null, _parent));
      _push(`</div></div>`);
      if ((todos.value === null || todos.value.length < 1) && !loading.value) {
        _push(`<div class="d-flex justify-center align-center" style="${ssrRenderStyle({ "height": "60vh" })}"><div><div class="d-flex justify-content-center align-items-center">`);
        _push(ssrRenderComponent(VIcon, {
          size: "100",
          color: "grey lighten-1"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`mdi-format-list-checks`);
            } else {
              return [
                createTextVNode("mdi-format-list-checks")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div><div class="d-flex justify-content-center align-items-center"><p>No todo found</p></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (loading.value) {
        _push(`<div class="d-flex justify-center align-center" style="${ssrRenderStyle({ "height": "60vh" })}">`);
        _push(ssrRenderComponent(VProgressCircular, {
          indeterminate: "",
          color: "primary"
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (!loading.value) {
        _push(`<div><!--[-->`);
        ssrRenderList(todos.value, (p) => {
          _push(`<div class="todo-item">`);
          _push(ssrRenderComponent(_component_TodoCard, {
            todo: p,
            onFetchAgain: ($event) => fetchData()
          }, null, _parent));
          _push(`</div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/todo/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-D9TeGPnP.mjs.map
