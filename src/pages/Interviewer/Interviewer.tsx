import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  Table,
  Container,
  Row,
  Col,
  Button,
  Modal,
  Form,
} from 'react-bootstrap';
import { IUser, IState } from '../../interfaces';
import { updeteUserPoint } from '../../redux/user/actions';
import InterviewTasks from '../../static/interviewTasks.json';

interface IProps {
  updeteUserPointFunc: (userId: number, point: number) => void;
  users: Array<IUser>;
}

const Interviewer = ({ updeteUserPointFunc, users }: IProps) => {
  const [selectedUserId, setSelectedUserId] = useState<number>(0);
  const [selectedTaskIds, setSelectedTaskIds] = useState<Array<number>>([]);
  const [showCheckListModal, setShowCheckListModal] = useState<boolean>(false);

  // close Taks modal
  const handleCloseCheckListModal = () => {
    setShowCheckListModal(false);

    // clear selected taks ids
    setSelectedTaskIds([]);
  };

  // open tasks modal
  const handleShowCheckListModal = (userId: number) => {
    setSelectedUserId(userId);
    setShowCheckListModal(true);
  };

  // calculate and update interviwer Point
  const updateInterviwerPoint = () => {
    const points = calculatePointByTaskId(selectedTaskIds);

    // update user points from redux
    updeteUserPointFunc(selectedUserId, points);
    handleCloseCheckListModal();
  };

  // calulate complated taks point by taskIds
  const calculatePointByTaskId = (taskIds: Array<number>) => {
    return InterviewTasks.reduce(function (prev, cur) {
      return taskIds.includes(cur.id) ? prev + cur.point : prev;
    }, 0);
  };

  // when check or uncheked tasks in modal, add or remove task id in state
  const taskHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const taskId = parseInt( event.target.value );

    event.target.checked === true
      ? addTaskIdFromSelectedTaskIds(taskId)
      : removeTaskIdFromSelectedTaskIds(taskId);
  };

  // add task id
  const addTaskIdFromSelectedTaskIds = (taskId: number) => {
    setSelectedTaskIds([...selectedTaskIds, taskId]);
  };

  // delete task id
  const removeTaskIdFromSelectedTaskIds = (taskId: number) => {
    setSelectedTaskIds(selectedTaskIds.filter((id) => id !== taskId));
  };

  return (
    <>
      <Container
        className="justify-content-md-center"
        style={{ marginTop: '3%' }}
      >
        <Row>
          <Col style={{ display: 'flex', justifyContent: 'center' }}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Point</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.lastname}</td>
                    <td>{user.point}</td>
                    <td>
                      <Button
                        variant="primary"
                        onClick={() => handleShowCheckListModal(user.id)}
                      >
                        Calculate
                      </Button>{' '}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
      <Modal
        size="lg"
        show={showCheckListModal}
        onHide={handleCloseCheckListModal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Calculate Interwiver's Tasks Points</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th />
                <th>Text</th>
                <th>Point</th>
              </tr>
            </thead>
            <tbody>
              {InterviewTasks.map((task) => (
                <tr>
                  <td>
                    <Form.Check
                      type="checkbox"
                      value={task.id}
                      onChange={taskHandleChange}
                    />
                  </td>
                  <td>{task.text}</td>
                  <td>{task.point}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseCheckListModal}>
            Close
          </Button>
          <Button variant="primary" onClick={updateInterviwerPoint}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

const mapStateToProps = (state: IState) => ({
  users: state.users,
});

const mapDispatchToProps = {
  updeteUserPointFunc: updeteUserPoint,
};

export default connect(mapStateToProps, mapDispatchToProps)( Interviewer );
