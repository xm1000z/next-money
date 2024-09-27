"use client";

import * as React from "react";

import { Button, Drawer, Form, Input, InputNumber, Select, Space } from "antd";
import { FormListFieldData } from "antd/lib/form";
import { toast } from "sonner";

import type { GiftCodeSelectDto } from "@/db/type";
import useForm from "@/hooks/use-form";
import { getErrorMessage } from "@/lib/handle-error";
import { generateGifCode } from "@/lib/utils";

import { updateAction } from "../_lib/actions";
import { updateSchema, type UpdateSchema } from "../_lib/validations";

const FormItem = Form.Item;
export function UpdateDialog(props: { detail: GiftCodeSelectDto }) {
  const { detail } = props;
  const [open, setOpen] = React.useState(false);
  const [isCreatePending, startCreateTransition] = React.useTransition();

  function onSubmit(input: UpdateSchema, error: FormListFieldData | null) {
    if (detail.used) {
      return toast.error("No se permite modificar un código ya utilizado");
    }
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
      code: detail?.code ?? "",
      creditAmount: detail?.creditAmount,
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
        title="Actualizar Código de Regalo"
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
        <Form layout="vertical" {...formField} disabled={!!detail?.used}>
          <FormItem {...inputField} label="Puntos del Código de Regalo" name="creditAmount">
            <InputNumber
              className="!w-full"
              placeholder="Por favor, ingrese la cantidad de crédito..."
            />
          </FormItem>
          <FormItem
            {...inputField}
            className="!w-full"
            label="Código del Regalo"
            name="code"
          >
            <Input.Search
              className="!w-full"
              placeholder="Por favor, ingrese..."
              enterButton={
                <Button
                  type="default"
                  disabled={!!detail?.used}
                  onClick={() => {
                    formField.form.setFieldValue("code", generateGifCode(10));
                  }}
                >
                  Generar
                </Button>
              }
            />
          </FormItem>
        </Form>
      </Drawer>
    </>
  );
}
