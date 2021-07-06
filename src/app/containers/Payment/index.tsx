import { Button, Container, Dialog, DialogContent, makeStyles, Modal, Typography } from "@material-ui/core";
import GenerateForm from "app/components/GenerateForm";
import React, { useState } from "react";
import { bankDepositForm, paymentOptionform } from "./form";
const useStyles = makeStyles((theme) => ({
    paper: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        outline: 0,
        alignSelf: "center",
        display: "flex",
        flexDirection: "column"
    },
    modal: {
        display: 'flex',
        padding: theme.spacing(1),
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        alignSelf: "flex-end",
        marginTop: "1rem"
    }
}));
interface PaymentProps {
    amount: number;
    open: boolean;
    onClose: () => void;
}
const OnlinePayment = () => <p>Online payment</p>;
export default function Payment(props: PaymentProps) {
    const [paymentOption, setPaymentOption] = useState({ payment_option: '' })
    const [selectedBank, setSelectedBank] = useState({ bank: '' });
    const classes = useStyles();
    const onPaymentOptionChanged = (data) => {
        console.log(data);
        setPaymentOption(data);
    }
    return <>
        <Modal open={props.open} className={classes.modal} >
            <Container maxWidth="md" className={classes.paper}>
                <Typography variant="h3">Payment</Typography>

                <Typography variant="h6" color="textSecondary">you need to pay {props.amount} Birr inorder to process your request</Typography>
                <GenerateForm
                    elements={paymentOptionform}
                    values={paymentOption}
                    onChanges={onPaymentOptionChanged}
                />
                {/** end of payment option form. */}

                {
                    paymentOption.payment_option !== '' ?
                        (paymentOption.payment_option === 'online'
                            ?
                            <OnlinePayment />
                            :
                            <GenerateForm
                                elements={bankDepositForm}
                                values={selectedBank}
                                onChanges={setSelectedBank}
                            />
                        ) : null
                }

                {
                    paymentOption.payment_option !== '' ? (
                        <Button variant="contained" color="primary" className={classes.button}>
                            Make a Request
                        </Button>
                    ) : null
                }
            </Container>
        </Modal>
    </>;
}