import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
    Grid,
    Box,
} from "@mui/material";
import { green } from "@mui/material/colors";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [review, setReview] = useState("");
    const [recommendations, setRecommendations] = useState([]);

    // Fetch products from backend
    useEffect(() => {
        axios
            .get("http://localhost:5000/api/products")
            .then((response) => setProducts(response.data))
            .catch((error) => console.error("❌ Error fetching products:", error));
    }, []);

    // Fetch AI Recommendations for the selected product
    const fetchRecommendations = async (productId) => {
        try {
            const userId = localStorage.getItem("userId"); // Get logged-in user ID
            const response = await axios.get(
                `http://localhost:5003/recommend?user_id=${userId}&product_id=${productId}`
            );

            console.log("✅ Recommendations received:", response.data.recommendations);
            setRecommendations(response.data.recommendations);
        } catch (error) {
            console.error("❌ Error fetching recommendations:", error);
        }
    };

    // Open Review Popup
    const handleOpen = (product) => {
        setSelectedProduct(product);
        setOpen(true);
        fetchRecommendations(product.id); // Fetch recommendations when popup opens
    };

    // Close Popup
    const handleClose = () => {
        setOpen(false);
        setReview("");
        setRecommendations([]); // Clear recommendations when popup closes
    };

    // Submit Review
    const handleSubmitReview = async () => {
        if (!selectedProduct || review.trim() === "") {
            alert("Please enter a review!");
            return;
        }

        try {
            console.log(`📌 Submitting review for Product ID: ${selectedProduct.id}, Review: ${review}`);

            const response = await axios.post("http://localhost:5001/analyze_review", {
                product_id: selectedProduct.id,
                review: review,
            });

            console.log("✅ Review Submitted Successfully:", response.data);
            alert("Thank you for your review!");
            handleClose(); // Close popup after submission
        } catch (error) {
            console.error("❌ Error submitting review:", error);
            alert("Failed to submit review. Please try again.");
        }
    };

    return (
        <Box sx={{ padding: "20px", backgroundColor: "#f7f9fc", minHeight: "100vh" }}>
            <Typography
                variant="h4"
                sx={{
                    color: green[800],
                    marginBottom: 3,
                    textAlign: "center",
                    fontWeight: "bold",
                }}
            >
                🌱 Eco-Friendly Products
            </Typography>
            <Grid container spacing={4}>
                {products.map((product) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                        <Card
                            sx={{
                                boxShadow: 3,
                                borderRadius: "15px",
                                transition: "transform 0.3s ease-in-out",
                                "&:hover": {
                                    transform: "scale(1.05)",
                                },
                            }}
                        >
                            <CardMedia
                                component="img"
                                height="200"
                                image={product.image_url || "https://pixabay.com/fr/photos/sac-coton-sac-en-coton-textile-mur-4364558/"} // Use backend image URL or fallback
                                alt={product.name}
                                sx={{ objectFit: "cover" }}
                            />
                            <CardContent>
                                <Typography
                                    gutterBottom
                                    variant="h6"
                                    sx={{ color: green[700], fontWeight: "bold" }}
                                >
                                    {product.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {product.description}
                                </Typography>
                                <Typography
                                    variant="h6"
                                    sx={{ color: green[800], marginTop: 1 }}
                                >
                                    💲{product.price}
                                </Typography>
                                <Typography variant="body2">
                                    🌟 Eco Rating: {product.eco_rating} / 5
                                </Typography>
                                <Typography variant="body2">👀 Views: {product.views}</Typography>
                                <Button
                                    variant="contained"
                                    sx={{
                                        marginTop: "10px",
                                        backgroundColor: green[700],
                                        color: "white",
                                    }}
                                    onClick={() => handleOpen(product)}
                                >
                                    Leave a Review
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Review Popup */}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Leave a Review</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Your Review"
                        fullWidth
                        multiline
                        rows={3}
                        variant="outlined"
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} sx={{ color: "gray" }}>
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSubmitReview}
                        sx={{ backgroundColor: green[700], color: "white" }}
                    >
                        Submit
                    </Button>
                </DialogActions>

                {/* Recommended Products Section */}
                <DialogContent>
                    {recommendations && recommendations.length > 0 ? (
                        <>
                            <Typography
                                variant="h6"
                                sx={{ marginTop: 2, marginBottom: 2, color: green[800] }}
                            >
                                🔗 Recommended Products:
                            </Typography>
                            <Grid container spacing={2}>
                                {recommendations.map((rec) => (
                                    <Grid item xs={12} key={rec.id}>
                                        <Card
                                            sx={{
                                                boxShadow: 1,
                                                borderRadius: "10px",
                                                backgroundColor: "#e8f5e9",
                                            }}
                                        >
                                            <CardContent>
                                                <Typography
                                                    variant="subtitle1"
                                                    sx={{ color: green[700], fontWeight: "bold" }}
                                                >
                                                    {rec.name}
                                                </Typography>
                                                <Typography variant="body2">
                                                    💲 {rec.price}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </>
                    ) : (
                        <Typography
                            variant="body2"
                            sx={{ marginTop: 2, color: "gray", textAlign: "center" }}
                        >
                            ❌ No recommendations available.
                        </Typography>
                    )}
                </DialogContent>
            </Dialog>
        </Box>
    );
};

export default Products;
