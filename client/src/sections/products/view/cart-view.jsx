import PropTypes from "prop-types";
import { useState } from "react";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import Cart from "../product-cart";

export default function CartView({ cart }) {
    const cartItems = cart.getItems();

    const infos = [];
    cartItems.forEach((quantity, product) => {
        infos.push([product.id, product.nom, product.prixClient, quantity]);
    });

    return (
        <Card
            sx={{
                height: 500,
                width: 360,
                display: "flex",
                flexDirection: "column",
            }}
        >
            <CardHeader title="Panier du client 🛒" />
            <Stack spacing={2} sx={{ p: 3, flexGrow: 1, overflowY: "auto" }}>
                {cartItems instanceof Map &&
                    infos.map((product, index) => (
                        <CartItem
                            key={index}
                            infos={{
                                id: product[0],
                                name: product[1],
                                unitPrice: product[2],
                                quantity: product[3],
                            }}
                        />
                    ))}
            </Stack>
            <Divider sx={{ mt: 0 }} />
            <Box sx={{ p: 3 }}>
                <Stack direction="row" justifyContent="space-between">
                    <Typography
                        variant="subtitle1"
                        sx={{ color: "inherit" }}
                        style={{ textAlign: "left" }}
                    >
                        Articles : {cart.getItemCount()}
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        sx={{ color: "inherit" }}
                        style={{ textAlign: "right" }}
                    >
                        Total : {cart.getTotal()} €
                    </Typography>
                </Stack>
            </Box>
        </Card>
    );
}

CartView.propTypes = {
    cart: PropTypes.instanceOf(Cart).isRequired,
};

// ----------------------------------------------------------------------

function CartItem({ infos }) {
    const id = infos.id;
    const name = infos.name;
    const unitPrice = infos.unitPrice;
    const quantity = infos.quantity;
    const totalPrice = quantity * unitPrice;

    return (
        <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
        >
            <Stack direction="column" alignItems="left">
                <Typography
                    variant="subtitle1"
                    sx={{ color: "inherit" }}
                    noWrap
                >
                    {name}
                </Typography>
                <Typography
                    variant="subtitle2"
                    sx={{ color: "text.secondary" }}
                >
                    {unitPrice} € x {quantity}
                </Typography>
            </Stack>
            <Typography variant="subtitle2" sx={{ color: "inherit" }}>
                {totalPrice} €
            </Typography>
        </Stack>
    );
}

CartItem.propTypes = {
    infos: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        unitPrice: PropTypes.number.isRequired,
        quantity: PropTypes.number.isRequired,
    }),
};
