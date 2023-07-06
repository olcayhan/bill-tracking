import React, { useCallback, useState } from "react";
import { Button, Modal, Stack } from "react-bootstrap";
import { useClass } from "../../../contexts/ClassContext";
import { RiErrorWarningLine } from "react-icons/ri";
import { toast } from "react-hot-toast";
import Spinner from "../../Spinner";
import useBill from "../../../hooks/useBill";

export default function Bill({ show, student, handleClose }) {
  const { payBill } = useClass();
  console.log(student);
  const [isLoading, setLoading] = useState(false);
  const { data: bills } = useBill(student?._id);
  const handlePay = useCallback(
    (item) => {
      setLoading(true);
      try {
        payBill(item);
        item.isPaid
          ? toast.success("Fatura Ödemesi Geri Alındı")
          : toast.success("Fatura Ödendi");
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    },
    [payBill, isLoading]
  );

  console.log(isLoading);

  if (isLoading) {
    return <div>Loading</div>;
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton className="bg-secondary">
        <Modal.Title>Faturalar</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {bills?.length !== 0 ? (
          bills
            ?.sort((a, b) => new Date(a.date) - new Date(b.date))
            .map((item, key) => {
              const courseDate = new Date(item.date);
              const currentDate = new Date();

              if (courseDate < currentDate) {
                return (
                  <Stack
                    direction="horizontal"
                    key={key}
                    className="m-2 p-2"
                    style={
                      item.isPaid
                        ? { backgroundColor: "#C7E9B0" }
                        : { backgroundColor: "#e78c46" }
                    }
                  >
                    <p>
                      {`${courseDate.getFullYear()} Yılının  ${
                        courseDate.getMonth() + 1
                      }. Ayı`}{" "}
                      <RiErrorWarningLine style={{ color: "yellow" }} />
                    </p>
                    <p> {item.class} </p>
                    <Button
                      className="btn ms-auto"
                      onClick={() => handlePay(item)}
                      style={
                        item.isPaid
                          ? { backgroundColor: "#245953", border: "none" }
                          : { backgroundColor: "#D21312", border: "none" }
                      }
                      disabled={Date.now() < Date.parse(item.date)}
                    >
                      {item.isPaid ? "Ödenmiş" : "Öde"}
                    </Button>
                  </Stack>
                );
              } else if (
                (courseDate.getFullYear() === currentDate.getFullYear() &&
                  courseDate.getMonth() - 2 <= currentDate.getMonth()) ||
                (courseDate.getFullYear() > currentDate.getFullYear() &&
                  courseDate.getMonth() + 10 <= currentDate.getMonth())
              ) {
                return (
                  <Stack
                    direction="horizontal"
                    key={key}
                    className="m-2 p-2"
                    style={
                      item.isPaid
                        ? { backgroundColor: "#C7E9B0" }
                        : { backgroundColor: "#E74646" }
                    }
                  >
                    <p>{`${courseDate.getFullYear()} Yılının  ${courseDate.getMonth()}. Ayı`}</p>
                    <p> {item.class} </p>
                    <Button
                      className="btn ms-auto"
                      onClick={() => handlePay(item)}
                      style={
                        item.isPaid
                          ? { backgroundColor: "#245953", border: "none" }
                          : { backgroundColor: "#D21312", border: "none" }
                      }
                    >
                      {isLoading ? (
                        <Spinner />
                      ) : item.isPaid ? (
                        "Ödenmiş"
                      ) : (
                        "Öde"
                      )}
                    </Button>
                  </Stack>
                );
              }
            })
        ) : (
          <p className="text-center">Fatura Bulunmamaktadır</p>
        )}
      </Modal.Body>
    </Modal>
  );
}
