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
    if(cartItems instanceof Map){
        cartItems.forEach((quantity, product) => {
            infos.push([product.id, product.nom, product.prixClient, quantity]);
        });
    }

    return (
        <Card
            sx={{
                height: 400,
                width: 380,
                overflowY: "auto",
                "& .MuiCardHeader-root": {
                    position: "sticky",
                    top: 0,
                    backgroundColor: "white",
                    zIndex: 1,
                    paddingBottom: "20px",
                },
            }}
        >
            <CardHeader title="Panier du client 🛒"/>
            <Stack spacing={2} sx={{ p: 3 }}>
                {   cartItems instanceof Map &&
                    infos.map((product, index) => (
                        <CartItem key={index} infos={{id: product[0], name: product[1], unitPrice: product[2], quantity: product[3]}} cart={cart} />
                    ))
                }
            </Stack>
            <Divider sx={{ mt: 0 }} />
            <Box sx={{ p: 3, pt: 0 }} style={{position: "sticky", bottom: 0, backgroundColor: "white"}}>
                <Stack direction="row" justifyContent="space-between">
                <Typography variant="subtitle1" sx={{ color: "inherit" }} style={{textAlign: "left"}}>
                    Articles : {cart.getItemCount()}
                </Typography>
                <Typography variant="subtitle1" sx={{ color: "inherit" }} style={{textAlign: "right"}}>
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

function CartItem({ infos, cart }) {
    const id = infos.id;
    const name = infos.name;
    const unitPrice = infos.unitPrice;
    const quantity = infos.quantity;
    const totalPrice = quantity * unitPrice;

    return (
        <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Stack direction="column" alignItems="left" >
                <Typography
                    variant="subtitle1"
                    sx={{ color: "inherit" }}
                    noWrap>
                    {name}
                </Typography>
                <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
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
    cart: PropTypes.instanceOf(Cart).isRequired,
};
