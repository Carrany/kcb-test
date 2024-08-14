import { useModal } from "_hooks";
import { AppModalCreateUser } from "_lib/AppModal";
import { bomaYanguService } from "_services";
import { Button, Flex, Table, Typography } from "antd";
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { usersColumns } from "./columns";
import UserContext from "context/UserContext";

const AppUsersList = () => {
  const { open, toggle, setModalData, modalData } = useModal();
  const { user } = useContext(UserContext);

  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const getUsers = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data } = await bomaYanguService.fetchUsers();
      setUsers(data?.payload?.content);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!user) return;
    getUsers();
  }, [getUsers, user]);

  const onClickCreateUser = useCallback(() => {
    setIsEdit(false);
    toggle();
  }, [toggle]);

  const onClickEdit = useCallback(
    (editData) => () => {
      setIsEdit(true);
      toggle();
      setModalData(editData);
    },
    [setModalData, toggle]
  );

  const columns = useMemo(() => {
    return [
      ...usersColumns,
      {
        title: "Edit",
        dataIndex: "edit",
        key: "edit",
        span: 2,
        render: (_, data) => (
          <Button type="link" onClick={onClickEdit(data)}>
            Edit
          </Button>
        ),
      },
    ];
  }, [onClickEdit]);

  return (
    <>
      <AppModalCreateUser
        isEdit={isEdit}
        open={open}
        modalData={modalData}
        toggle={toggle}
        onSuccess={getUsers}
      />
      <Title level={3}>Users List</Title>
      <Flex align="center" justify="end">
        <Button type="primary" onClick={onClickCreateUser}>
          Create User
        </Button>
      </Flex>
      <br />
      <Table
        loading={isLoading}
        columns={columns}
        dataSource={users}
        bordered
      />
    </>
  );
};

const { Title } = Typography;

export default AppUsersList;
