import PropTypes from "prop-types";

import AppNewsUpdate from "../../overview/app-news-update";
import Cart from "../product-cart";

export default function CartView({ cart }) {
    const randomNum = Math.floor(Math.random() * 20) + 1;

    return (
        <AppNewsUpdate
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
            title="Panier du client 🛒"
            list={[...Array(cart.getSize())].map((_, index) => ({
                id: cart.getCart().keys()[index].id,
                title: cart.getCart().keys()[index].nom,
                description: cart.getCart().keys()[index].type + " - " + cart.getCart().values()[index] + " x " + cart.getCart().keys()[index].prixClient + " €",
                image: `/assets/images/covers/cover_${index + 1}.jpg`,
                postedAt: cart.getCart().keys()[index].prixClient * cart.getCart().values()[index] + " €",
            }))}
        />
    );
}

CartView.propTypes = {
    cart: PropTypes.objectOf(Cart).isRequired,
};
