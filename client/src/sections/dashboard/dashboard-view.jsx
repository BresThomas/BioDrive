import { faker } from "@faker-js/faker";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import PropTypes from "prop-types";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ListItemButton from "@mui/material/ListItemButton";
import Stack from "@mui/material/Stack";
import { alpha, useTheme } from "@mui/material/styles";
import LoadingButton from "@mui/lab/LoadingButton";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import InputAdornment from "@mui/material/InputAdornment";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import PostSearch from "../blog/post-search";
import Iconify from "../../components/iconify";
import { RouterLink } from "../../routes/components";
import { usePathname, useRouter } from "../../routes/hooks";
import Popup from "../../components/popup/popup";

import AppTasks from "../overview/app-tasks";
import AppNewsUpdate from "../overview/app-news-update";
import AppOrderTimeline from "../overview/app-order-timeline";
import AppCurrentVisits from "../overview/app-current-visits";
import AppWebsiteVisits from "../overview/app-website-visits";
import AppWidgetSummary from "../overview/app-widget-summary";
import AppTrafficBySite from "../overview/app-traffic-by-site";
import AppCurrentSubject from "../overview/app-current-subject";
import AppConversionRates from "../overview/app-conversion-rates";
import AppNumPad from "../overview/app-numpad";

import { NAV } from "../../layouts/dashboard/config-layout";
import navConfig from "../../layouts/dashboard/config-navigation";
import { posts } from "../../_mock/blog";
import Product from "../products/product";
import CartView from "../products/view/cart-view";
import Cart from "../products/product-cart";

// ----------------------------------------------------------------------

const paymentModes = ["Cartes bancaire", "Liquide"];

let selectedProduct;

function setSelectedProduct(newValue) {
    selectedProduct = newValue;
}

export default function DashboardView() {

    const [cart, setCart] = useState(window.localStorage.getItem('cart') ? new Cart(JSON.parse(window.localStorage.getItem('cart'))) : new Cart([]));
    const [enteredValue, setEnteredValue] = useState("");
    const [paymentMode, setPaymentMode] = useState("");

    const handleValueChange = (newValue) => {
        console.log("New value:", newValue);
        setEnteredValue(newValue);
    };

    const theme = useTheme();
    const router = useRouter();

    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3001/api/products")
            .then((response) => response.json())
            .then((data) => {
                // Assurez-vous que les données sont un tableau
                if (Array.isArray(data)) {
                    setProducts(data);
                } else {
                    console.error("Les données reçues ne sont pas un tableau.");
                }
            })
            .catch((error) => {
                console.error(
                    "Erreur lors de la récupération des données:",
                    error
                );
            });
    }, []);

    const handleClick = () => {
        router.push("/dashboard");
    };

    const handlePayment = async () => {
        if (enteredValue === "") {
            alert("Veuillez valider le montant à régler");
        } else if (paymentMode === "") {
            alert("Veuillez choisir un mode de paiement");
        } else {
            alert("Paiement effectué avec succès");
        }
    };

    const handleAddProduct = () => {
        if (selectedProduct) {
            const updatedCart = new Cart(cart.getItems());
            updatedCart.addItem(selectedProduct);
            setCart(updatedCart);
            window.localStorage.setItem('cart', JSON.stringify(updatedCart));
        }
    };

    const handleClearCart = () => {
        const updatedCart = new Cart();
        setCart(updatedCart);
        window.localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const sendTransaction = async (event) => {
        const response = await fetch(
            "http://localhost:3001/api/newTransaction",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    paymentMode,
                    value: enteredValue,
                    date: new Date().toLocaleString(),
                }),
            }
        );
    };


    const renderFormClient = (title) => (
        <Stack spacing={3} direction="row" alignItems="center">
            <Typography variant="h6" sx={{ width: "25%" }}>
                {title}
            </Typography>
            <Stack spacing={3} direction="row" alignItems="center">
                <PostSearch posts={posts} />
                <TextField
                    name="email"
                    label="Quantité"
                    sx={{ width: "60%" }}
                />
                <TextField
                    name="email"
                    label="Adresse livraison"
                    sx={{ width: "70%" }}
                />
                <TextField
                    name="email"
                    label="Date livraison"
                    sx={{ width: "70%" }}
                />
                <TextField name="email" label="Prix" sx={{ width: "40%" }} />
            </Stack>
            <LoadingButton
                sx={{ width: "22.5%" }}
                size="large"
                type="submit"
                variant="contained"
                color="inherit"
                onClick={handleClick}
            >
                Submit
            </LoadingButton>
        </Stack>
    );

    const renderFormIncident = (title) => (
        <Stack spacing={3} direction="row" alignItems="center">
            <Typography variant="h6" sx={{ width: "20%" }}>
                {title}
            </Typography>
            <Stack
                spacing={3}
                direction="row"
                alignItems="center"
                sx={{ width: "55%" }}
            >
                <TextField
                    name="intitule"
                    label="Intitulé"
                    sx={{ width: "30%" }}
                />
                <TextField
                    name="descriptionIncident"
                    label="Description de l'incident"
                    sx={{ width: "70%" }}
                />
            </Stack>
            <LoadingButton
                sx={{ width: "20%" }}
                size="large"
                type="submit"
                variant="contained"
                color="inherit"
                onClick={handleClick}
            >
                Submit
            </LoadingButton>
        </Stack>
    );

    const addProductForm = (
        <Stack spacing={3} alignItems="left">
            <Typography variant="h6">Ajout d&apos;un produit</Typography>

            <Stack spacing={3} direction="row" alignItems="center">
                {/* Wrap setSelectedProduct in an arrow function */}
                <PostSearch
                    items={products}
                    onValueChange={(selectedPost) =>
                        setSelectedProduct(selectedPost)
                    }
                />
                <Button
                    sx={{ width: "22.5%" }}
                    size="large"
                    type="submit"
                    variant="outlined"
                    color="inherit"
                    onClick={handleClearCart}
                    startIcon={<Iconify icon="tabler:reload" />}
                >
                    Clear
                </Button>
                <Button
                    sx={{ width: "22.5%" }}
                    size="large"
                    type="submit"
                    variant="contained"
                    color="inherit"
                    onClick={handleAddProduct}
                    startIcon={<Iconify icon="fluent:add-12-regular" />}
                >
                    Ajouter
                </Button>
            </Stack>
        </Stack>
    );

    const cashRegisterForm = (
        <Stack spacing={3} alignItems="left">
            <Typography variant="h6">
                Enregistrement d&apos;un paiement 🧾
            </Typography>

            <Stack spacing={3} direction="row" alignItems="center">
                <Typography variant="h6">Somme total à régler:</Typography>
                <Typography variant="h6">
                    {enteredValue} €
                </Typography>

                <Select
                    value={paymentMode}
                    onChange={(event) => setPaymentMode(event.target.value)}
                    displayEmpty
                    startAdornment={
                        <InputAdornment position="start">
                            <Iconify icon="eva:credit-card-fill" />
                        </InputAdornment>
                    }
                >
                    <MenuItem value="" disabled>
                        Mode de paiement
                    </MenuItem>
                    {paymentModes.map((mode) => (
                        <MenuItem key={mode} value={mode}>
                            {mode}
                        </MenuItem>
                    ))}
                </Select>

                <LoadingButton
                    sx={{ width: "22.5%" }}
                    size="large"
                    type="submit"
                    variant="contained"
                    color="inherit"
                    onClick={handlePayment}
                >
                    Procéder au paiement
                </LoadingButton>
            </Stack>
        </Stack>
    );

    return (
        <Container maxWidth="xxl">
            <Grid container spacing={3}>
                <Grid item xs={12} sm={12} md={5} xl={5}>
                    <Typography variant="h4" sx={{ mb: 2, mt: 5 }}>
                        Caisse 💶
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item>
                            <Stack
                                alignItems="center"
                                justifyContent="center"
                                sx={{ height: 1, width: "750px" }}
                            >
                                <Grid xs={12.4} md={12.6} lg={12.4}>
                                    <Card
                                        sx={{
                                            p: 3,
                                            width: 1,
                                        }}
                                    >
                                        {addProductForm}
                                    </Card>
                                </Grid>
                                <Grid xs={12.4} md={12.6} lg={12.4}>
                                    <Card
                                        sx={{
                                            p: 3,
                                            width: 1,
                                        }}
                                    >
                                        {cashRegisterForm}
                                    </Card>
                                </Grid>
                                <Grid
                                    container
                                    spacing={3}
                                    justifyContent="center"
                                >
                                    <Grid>
                                        <AppNumPad
                                            onValueChange={handleValueChange}
                                        />
                                    </Grid>
                                    <Grid>
                                        <CartView cart={cart}/>
                                    </Grid>
                                </Grid>
                            </Stack>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={36} sm={12} md={7} xl={7}>
                    <Typography variant="h4" sx={{ mb: 2, mt: 5 }}>
                        ERP 👋
                    </Typography>
                    <Stack direction="row" spacing={2} sx={{ p: 2 }}>
                        {navConfig.map((item) => (
                            <NavItem key={item.title} item={item} />
                        ))}
                    </Stack>

                    <Grid container spacing={3}>
                        <Grid xs={12} sm={6} md={3}>
                            <Stack
                                alignItems="center"
                                justifyContent="center"
                                sx={{ height: 1 }}
                            >
                                <Card
                                    sx={{
                                        p: 3,
                                        width: 1,
                                    }}
                                >
                                    {renderFormClient("Ajouter client 👤")}
                                </Card>
                            </Stack>
                        </Grid>
                        <Grid container spacing={3}>
                            <Grid xs={12} md={6} lg={4}>
                                <AppNewsUpdate
                                    sx={{
                                        width: 520,
                                        height: 200,
                                        overflowY: "auto",
                                    }}
                                    title="Derniers incidents ⚠️"
                                    list={[...Array(5)].map((_, index) => ({
                                        id: faker.string.uuid(),
                                        title: faker.person.jobTitle(),
                                        description:
                                            faker.commerce.productDescription(),
                                        image: `/assets/images/covers/cover_${index + 1}.jpg`,
                                        postedAt: faker.date.recent(),
                                    }))}
                                />
                            </Grid>
                            <Grid xs={12} md={6} lg={4}>
                                <AppNewsUpdate
                                    sx={{
                                        width: 520,
                                        height: 200,
                                        overflowY: "auto",
                                    }}
                                    title="Consulter les stocks 📦"
                                    list={[...Array(5)].map((_, index) => ({
                                        id: faker.string.uuid(),
                                        title: faker.person.jobTitle(),
                                        description:
                                            faker.commerce.productDescription(),
                                        image: `/assets/images/covers/cover_${index + 1}.jpg`,
                                        postedAt: faker.date.recent(),
                                    }))}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={3}>
                            <Grid xs={12} md={6} lg={4}>
                                <AppNewsUpdate
                                    sx={{
                                        width: 520,
                                        height: 200,
                                        overflowY: "auto",
                                    }}
                                    title="Pompes ⛽"
                                    list={[...Array(5)].map((_, index) => ({
                                        id: faker.string.uuid(),
                                        title: faker.person.jobTitle(),
                                        description:
                                            faker.commerce.productDescription(),
                                        image: `/assets/images/covers/cover_${index + 1}.jpg`,
                                        postedAt: faker.date.recent(),
                                    }))}
                                />
                            </Grid>
                            <Grid xs={12} md={6} lg={4}>
                                <AppNewsUpdate
                                    sx={{
                                        width: 520,
                                        height: 200,
                                        overflowY: "auto",
                                    }}
                                    title="Rechercher client 👤"
                                    list={[...Array(5)].map((_, index) => ({
                                        id: faker.string.uuid(),
                                        title: faker.person.jobTitle(),
                                        description:
                                            faker.commerce.productDescription(),
                                        image: `/assets/images/covers/cover_${index + 1}.jpg`,
                                        postedAt: faker.date.recent(),
                                    }))}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid xs={12} sm={6} md={3} pt={3}>
                        <Stack
                            alignItems="center"
                            justifyContent="center"
                            sx={{ height: 1 }}
                        >
                            <Card
                                sx={{
                                    p: 3,
                                    width: 1,
                                }}
                            >
                                {renderFormIncident("Créer un incident ⚠️")}
                            </Card>
                        </Stack>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
}

// ----------------------------------------------------------------------

function NavItem({ item }) {
    const pathname = usePathname();

    const active = item.path === pathname;

    return (
        <ListItemButton
            component={RouterLink}
            href={item.path}
            sx={{
                minHeight: 44,
                borderRadius: 0.75,
                typography: "body2",
                color: "text.secondary",
                textTransform: "capitalize",
                fontWeight: "fontWeightMedium",
                ...(active && {
                    color: "primary.main",
                    fontWeight: "fontWeightSemiBold",
                    bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
                    "&:hover": {
                        bgcolor: (theme) =>
                            alpha(theme.palette.primary.main, 0.16),
                    },
                }),
            }}
        >
            <Box component="span" sx={{ width: 24, height: 24, mr: 2 }}>
                {item.icon}
            </Box>

            <Box component="span">{item.title} </Box>
        </ListItemButton>
    );
}

NavItem.propTypes = {
    item: PropTypes.object,
};
