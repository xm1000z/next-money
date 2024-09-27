"use client";

import { useTransition } from "react";

import { Button, Popconfirm, Space, type TableColumnsType } from "antd";

import { type GiftCodeSelectDto } from "@/db/type";
import { formatPrice } from "@/lib/utils";

import { deleteAction } from "../_lib/actions";
import { UpdateDialog } from "./update-dialog";

const DeleteAction = (props: { id: string }) => {
  const [isDeletePending, startDeleteTransition] = useTransition();

  const confirm = () => {
    startDeleteTransition(() => {
      deleteAction({ id: props.id });
    });
  };

  return (
    <Popconfirm
      title="Do you want to delete these item?"
      description="After deletion, it will not be recoverable"
      onConfirm={confirm}
      onCancel={() => {}}
      okText="Yes"
      cancelText="No"
    >
      <Button
        danger
        type="default"
        disabled={isDeletePending}
        loading={isDeletePending}
      >
        Delete
      </Button>
    </Popconfirm>
  );
};

export function getColumns(): TableColumnsType<GiftCodeSelectDto> {
  return [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Créditos",
      dataIndex: "creditAmount",
    },
    {
      title: "Código",
      dataIndex: "code",
    },
    {
      title: "Estado",
      dataIndex: "used",
      render: (used) => (used ? "Usado" : "Sin usar"),
    },
    {
      title: "Creado el",
      dataIndex: "createdAt",
      render: (date) => new Date(date).toLocaleString(),
    },
    {
      title: "Acción",
      dataIndex: "actions",
      render: (_date, row: GiftCodeSelectDto) => {
        return (
          <Space>
            <UpdateDialog detail={row} />
            <DeleteAction id={row.id} />
          </Space>
        );
      },
    },
  ];
}
