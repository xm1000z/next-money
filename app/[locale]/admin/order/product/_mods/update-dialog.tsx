"use client";

import * as React from "react";

import { Button, Drawer, Form, Input, InputNumber, Select, Space } from "antd";
import { FormListFieldData } from "antd/lib/form";
import { useLocale, useTranslations } from "next-intl";
import { toast } from "sonner";

import { Locale, locales } from "@/config";
import { Currency, type ChargeProductSelectDto } from "@/db/type";
import useForm from "@/hooks/use-form";
import { getErrorMessage } from "@/lib/handle-error";

import { updateAction } from "../_lib/actions";
import { updateSchema, type UpdateSchema } from "../_lib/validations";

const FormItem = Form.Item;
export function UpdateDialog(props: { detail: ChargeProductSelectDto }) {
  const { detail } = props;
  const [open, setOpen] = React.useState(false);
  const [isCreatePending, startCreateTransition] = React.useTransition();
  const t = useTranslations("LocaleSwitcher");

  function onSubmit(input: UpdateSchema, error: FormListFieldData | null) {
    if (error) {
      const err = getErrorMessage(error);
      console.log("error-->", err);

      return toast.error(err + "");
    }
    startCreateTransition(() => {
      toast.promise(updateAction({ ...input, id: detail.id }), {
        loading: "Actualizando...",
        success: () => {
          formField.form.resetFields();
          setOpen(false);
          return "Actualizado";
        },
        error: (error) => {
          setOpen(false);
          return getErrorMessage(error);
        },
      });
    });
  }
  const { formField, inputField } = useForm<UpdateSchema>({
    schema: updateSchema,
    onSubmit,
  });

  React.useEffect(() => {
    formField.form.setFieldsValue({
      ...detail,
      currency: detail?.currency as Currency,
      tag: (detail?.tag || []) as string[],
      message: detail?.message || "",
      locale: detail?.locale as Locale,
      state: (detail?.state || "enable") as "enable" | "disabled",
    });
  }, [detail, open]);

  return (
    <>
      <Button type="default" onClick={() => setOpen(true)}>
        Editar
      </Button>
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        title="Actualizar Producto de Recarga"
        size="large"
        footer={
          <Space className="flex w-full justify-end gap-2 pt-2 sm:space-x-0">
            <Button type="default" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button
              type="primary"
              disabled={isCreatePending}
              onClick={formField.form.submit}
            >
              Enviar
            </Button>
          </Space>
        }
      >
        <Form layout="vertical" {...formField}>
          <FormItem {...inputField} label="Título" name="title">
            <Input className="!w-full" placeholder="Por favor, ingrese..." />
          </FormItem>
          <FormItem {...inputField} label="Cantidad" name="amount">
            <InputNumber className="!w-full" placeholder="Por favor, ingrese..." />
          </FormItem>

          <FormItem
            {...inputField}
            label="Cantidad Original"
            name="originalAmount"
          >
            <InputNumber className="!w-full" placeholder="Por favor, ingrese..." />
          </FormItem>

          <FormItem {...inputField} label="Crédito" name="credit">
            <InputNumber className="!w-full" placeholder="Por favor, ingrese..." />
          </FormItem>

          <FormItem {...inputField} label="Moneda" name="currency">
            <Select
              options={[
                {
                  label: "CNY",
                  value: "CNY",
                },
                {
                  label: "USD",
                  value: "USD",
                },
                {
                  label: "EUR",
                  value: "EUR",
                },
              ]}
            />
          </FormItem>
          <FormItem {...inputField} label="Estado" name="state">
            <Select
              options={[
                {
                  label: "Activar",
                  value: "enable",
                },
                {
                  label: "Desactivar",
                  value: "disabled",
                },
              ]}
            />
          </FormItem>
          <FormItem {...inputField} label="Mensaje" name="message">
            <Input.TextArea
              rows={3}
              className="!w-full"
              placeholder="Por favor, ingrese..."
            />
          </FormItem>
          <FormItem {...inputField} label="Locale" name="locale">
            <Select
              options={locales.map((item) => ({
                value: item,
                label: t("locale", { locale: item }),
              }))}
            />
          </FormItem>
          <FormItem {...inputField} label="Tag" name="tag">
            <Select
              mode="tags"
              className="!w-full"
              placeholder="Por favor, ingrese..."
            />
          </FormItem>
        </Form>
      </Drawer>
    </>
  );
}
