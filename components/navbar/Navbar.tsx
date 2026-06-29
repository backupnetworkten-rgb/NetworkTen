"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  AppBar, Toolbar, Box, Button, IconButton, Drawer, List,
  ListItem, ListItemButton, ListItemText, Badge, InputBase,
  useMediaQuery, Menu, MenuItem, Typography, Collapse,
} from "@mui/material";
import MenuIcon                      from "@mui/icons-material/Menu";
import ShoppingCartIcon              from "@mui/icons-material/ShoppingCart";
import SearchIcon                    from "@mui/icons-material/Search";
import LoginRoundedIcon              from "@mui/icons-material/LoginRounded";
import KeyboardArrowDownRoundedIcon  from "@mui/icons-material/KeyboardArrowDownRounded";
import ExpandLess                    from "@mui/icons-material/ExpandLess";
import ExpandMore                    from "@mui/icons-material/ExpandMore";
import CloseRoundedIcon              from "@mui/icons-material/CloseRounded";
import AddRoundedIcon                from "@mui/icons-material/AddRounded";
import RemoveRoundedIcon             from "@mui/icons-material/RemoveRounded";
import DeleteOutlineRoundedIcon      from "@mui/icons-material/DeleteOutlineRounded";
import ShoppingBagOutlinedIcon       from "@mui/icons-material/ShoppingBagOutlined";
import { useTheme }                  from "@mui/material/styles";
import Image                         from "next/image";
import {
  getCart, onCartChange, cartCount, cartTotal,
  updateQuantity, removeFromCart, CartItem,
} from "@/lib/cartStore";
import { proxyImage } from "@/lib/proxyImage";

const navItems = [
  { label: "Home",      path: "/"          },
  { label: "Products",  path: "/products"  },
  { label: "Solutions", path: "/solutions" },
  { label: "Contact",   path: "/contact"   },
];

export default function Navbar() {
  const router = useRouter();

  const [open,        setOpen]        = useState(false);
  const [mobileAbout, setMobileAbout] = useState(false);
  const [aboutAnchor, setAboutAnchor] = useState<null | HTMLElement>(null);
  const [mounted,     setMounted]     = useState(false);
  const [cartOpen,    setCartOpen]    = useState(false);
  const [cartItems,   setCartItems]   = useState<CartItem[]>([]);

  const [user,setUser] = useState<any>(null);

  const [userAnchor, setUserAnchor] = useState<null|HTMLElement>(null);

  const theme  = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("lg"));

  useEffect(() => {
    setMounted(true);
    setCartItems(getCart());

    const saved = localStorage.getItem("user");

    if(saved){setUser(JSON.parse(saved));

}
    const unsub = onCartChange(() => setCartItems(getCart()));
    return unsub;
  }, []);

  if (!mounted) return null;

  const count = cartCount(cartItems);
  const total = cartTotal(cartItems);

  const openAboutMenu  = (e: React.MouseEvent<HTMLElement>) => setAboutAnchor(e.currentTarget);
  const closeAboutMenu = () => setAboutAnchor(null);

  const logout=()=>{localStorage.removeItem("user");
  setUser(null);
  router.push("/");
  };

  const openUser=(e:any)=>{setUserAnchor(e.currentTarget);
  };

  const closeUser=()=>{setUserAnchor(null);
};

  return (
    <>
      {/* ═══════════════════════════════ APPBAR ═══════════════════════════════ */}
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          background: "#ffffff",
          borderBottom: "1px solid #eef2f7",
          px: { xs: 1, md: 3 },
          backdropFilter: "blur(16px)",
          zIndex: 1200,
        }}
      >
        <Toolbar
          sx={{
            minHeight: { xs: "72px", md: "82px" },
            display: "flex",
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          {/* LEFT */}
          <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 2, lg: 5 }, flex: 1 }}>
            <Link href="/" style={{ textDecoration: "none" }}>
              <Box sx={{ display: "flex", alignItems: "center", flexShrink: 0, cursor: "pointer" }}>
                <Image
                  src="/images/logo.png"
                  alt="NetworkTen"
                  width={170}
                  height={50}
                  priority
                  style={{ width: "auto", height: "50px", objectFit: "contain" }}
                />
              </Box>
            </Link>

            {/* DESKTOP NAV */}
            {!mobile && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                {navItems.map((item) => (
                  <Link key={item.label} href={item.path} style={{ textDecoration: "none" }}>
                    <Button sx={{
                      color: "#102048", fontWeight: 700, textTransform: "none",
                      fontSize: "15px", px: 1.8, borderRadius: "10px", minWidth: "auto",
                      transition: "0.3s",
                      "&:hover": { background: "#f4f8fd", color: "#8BC53F" },
                    }}>
                      {item.label}
                    </Button>
                  </Link>
                ))}

                <Button
                  onClick={openAboutMenu}
                  endIcon={<KeyboardArrowDownRoundedIcon />}
                  sx={{
                    color: "#102048", fontWeight: 700, textTransform: "none",
                    fontSize: "15px", px: 1.8, borderRadius: "10px", minWidth: "auto",
                    transition: "0.3s",
                    "&:hover": { background: "#f4f8fd", color: "#8BC53F" },
                  }}
                >
                  About
                </Button>

                <Menu
                  anchorEl={aboutAnchor}
                  open={Boolean(aboutAnchor)}
                  onClose={closeAboutMenu}
                  slotProps={{
                    paper: {
                      elevation: 0,
                      sx: {
                        mt: 1.5, borderRadius: "18px", minWidth: 240, p: 1,
                        border: "1px solid #eef2f7",
                        boxShadow: "0 20px 50px rgba(0,0,0,0.08)",
                      },
                    },
                  }}
                >
                  {[
                    { label: "About Us", sub: "Learn more about NetworkTen", path: "/about"   },
                    { label: "Blog",     sub: "Latest updates & articles",   path: "/blog"    },
                    { label: "Careers",  sub: "Join our growing team",       path: "/careers" },
                  ].map((m) => (
                    <Link key={m.label} href={m.path} style={{ textDecoration: "none", color: "inherit" }}>
                      <MenuItem onClick={closeAboutMenu} sx={{ borderRadius: "12px", py: 1.5 }}>
                        <Box>
                          <Typography sx={{ fontWeight: 700, color: "#102048", fontSize: "14px" }}>
                            {m.label}
                          </Typography>
                          <Typography sx={{ fontSize: "12px", color: "#667085" }}>
                            {m.sub}
                          </Typography>
                        </Box>
                      </MenuItem>
                    </Link>
                  ))}
                </Menu>
              </Box>
            )}
          </Box>

          {/* RIGHT — DESKTOP */}
          {!mobile ? (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.1 }}>
              {/* Search */}
              <Box sx={{
                display: "flex", alignItems: "center",
                background: "#f5f7fb", borderRadius: "40px",
                px: 2, height: "46px", width: "250px",
                border: "1px solid #edf1f7",
              }}>
                <SearchIcon sx={{ color: "#7b8794", fontSize: 22, mr: 1 }} />
                <InputBase placeholder="Search products..." sx={{ width: "100%", fontSize: "14px" }} />
              </Box>

              {/* Cart icon with badge */}
              <IconButton
                onClick={() => setCartOpen(true)}
                sx={{
                  width: 46, height: 46,
                  background: "#f5f7fb",
                  border: "1px solid #edf1f7",
                  transition: "all 0.2s",
                  "&:hover": { background: "#102048", "& .cart-icon": { color: "#fff" } },
                }}
              >
                <Badge
                  badgeContent={count}
                  sx={{
                    "& .MuiBadge-badge": {
                      background: "#8BC53F", color: "#fff",
                      fontWeight: 800, fontSize: "10px",
                      minWidth: 18, height: 18,
                    },
                  }}
                >
                  <ShoppingCartIcon className="cart-icon" sx={{ color: "#102048", transition: "color 0.2s" }} />
                </Badge>
              </IconButton>

              {/* Shop Now */}
              <Link href="/products" style={{ textDecoration: "none" }}>
              <Button variant="contained" sx={{
                background: "#8BC53F", borderRadius: "40px", px: 2.2,
                minWidth: "118px", height: "46px", fontWeight: 700,
                textTransform: "none", fontSize: "14px", whiteSpace: "nowrap",
                boxShadow: "0 10px 24px rgba(139,197,63,0.18)", transition: "0.3s",
                "&:hover": { background: "#74ab35", transform: "translateY(-2px)" },
              }}>
                Shop Now
              </Button>
              </Link>

              {user ? (

<>

<Button

onClick={openUser}

variant="contained"

sx={{

background:"#fff",

height:"50px",

px:1,

borderRadius:"50px",

border:
"1px solid #edf1f7",

boxShadow:
"0 10px 24px rgba(16,32,72,.08)",

textTransform:"none",

display:"flex",

alignItems:"center",

gap:1.2,

transition:".25s",

"&:hover":{

background:"#f9fbff",

transform:
"translateY(-1px)"

}

}}

>

{/* AVATAR */}

<Box

sx={{

width:36,

height:36,

borderRadius:"50%",

background:
"linear-gradient(135deg,#8BC53F,#74ab35)",

display:"flex",

alignItems:"center",

justifyContent:"center",

fontSize:"18px"

}}

>

{

[
"🧑‍💼",

"👨‍💻",

"👩‍💻",

"🚀",

"⭐"

][

(
user?.name
?.length
||
0
)

%

5

]

}

</Box>

<Box
sx={{
  textAlign: "left"
}}
>

<Typography

sx={{

fontSize:"11px",

fontWeight:600,

color:"#98A2B3",

lineHeight:1

}}

>

Welcome

</Typography>

<Typography

sx={{

fontSize:"14px",

fontWeight:900,

background:
"linear-gradient(135deg,#102048,#8BC53F)",

WebkitBackgroundClip:
"text",

WebkitTextFillColor:
"transparent",

lineHeight:1.2

}}

>

{

user?.name
?.split(" ")[0]

||

"User"

}

</Typography>

</Box>

<KeyboardArrowDownRoundedIcon

sx={{

color:"#667085"

}}

/>

</Button>

<Menu

anchorEl={
userAnchor
}

open={
Boolean(
userAnchor
)
}

onClose={
closeUser
}

slotProps={{

paper:{

sx:{

mt:1.2,

borderRadius:"22px",

minWidth:240,

overflow:"hidden",

border:
"1px solid #edf1f7",

boxShadow:
"0 30px 80px rgba(16,32,72,.12)"

}

}

}}

>

<MenuItem

onClick={()=>{

router.push(
"/account"
);

}}

>

My Account

</MenuItem>

<MenuItem

onClick={()=>{

router.push(
"/account/orders"
)

}}

>

Orders

</MenuItem>

<MenuItem

onClick={()=>
{

logout();

closeUser();

}

}

sx={{

color:
"#ef4444"

}}

>

Logout

</MenuItem>

</Menu>

</>

):(


<Link

href="/login"

style={{

textDecoration:
"none"

}}

>

<Button

startIcon={
<LoginRoundedIcon/>
}

variant="contained"

sx={{

background:
"linear-gradient(135deg,#102048,#08142e)",

borderRadius:
"40px",

height:"46px",

px:2.6,

textTransform:
"none",

fontWeight:700

}}

>

Login

</Button>

</Link>

)}
            </Box>
          ) : (
            /* RIGHT — MOBILE */
            (<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <IconButton sx={{ background: "#f5f7fb", width: 42, height: 42 }}>
                <SearchIcon sx={{ color: "#102048" }} />
              </IconButton>
              <IconButton
                onClick={() => setCartOpen(true)}
                sx={{ background: "#f5f7fb", width: 42, height: 42 }}
              >
                <Badge
                  badgeContent={count}
                  sx={{
                    "& .MuiBadge-badge": {
                      background: "#8BC53F", color: "#fff",
                      fontWeight: 800, fontSize: "10px", minWidth: 17, height: 17,
                    },
                  }}
                >
                  <ShoppingCartIcon sx={{ color: "#102048" }} />
                </Badge>
              </IconButton>
              <IconButton onClick={() => setOpen(true)} sx={{ background: "#f5f7fb", width: 42, height: 42 }}>
                <MenuIcon sx={{ color: "#102048" }} />
              </IconButton>
            </Box>)
          )}
        </Toolbar>
      </AppBar>
      {/* ═══════════════════════════ MOBILE NAV DRAWER ════════════════════════ */}
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 280, p: 3 }}>
          <List>
            {navItems.map((item) => (
              <ListItem key={item.label} disablePadding>
                <Link href={item.path} style={{ width: "100%", textDecoration: "none", color: "inherit" }}>
                  <ListItemButton onClick={() => setOpen(false)} sx={{ borderRadius: "12px", mb: 1 }}>
                    <ListItemText primary={item.label} />
                  </ListItemButton>
                </Link>
              </ListItem>
            ))}

            <ListItem disablePadding>
              <ListItemButton
                onClick={() => setMobileAbout(!mobileAbout)}
                sx={{ borderRadius: "12px", mb: 1 }}
              >
                <ListItemText primary="About" />
                {mobileAbout ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            </ListItem>

            <Collapse in={mobileAbout} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {[
                  { label: "About Us", path: "/about"   },
                  { label: "Blog",     path: "/blog"    },
                  { label: "Careers",  path: "/careers" },
                ].map((item) => (
                  <ListItem key={item.label} disablePadding sx={{ pl: 2 }}>
                    <Link href={item.path} style={{ width: "100%", textDecoration: "none", color: "inherit" }}>
                      <ListItemButton onClick={() => setOpen(false)} sx={{ borderRadius: "10px", mb: 1 }}>
                        <ListItemText primary={item.label} />
                      </ListItemButton>
                    </Link>
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </List>

          <Box sx={{ display: "grid", gap: 1.2, mt: 2 }}>
            <Link href="/products" style={{ textDecoration: "none" }}>
            <Button fullWidth variant="contained" sx={{
              background: "#8BC53F", borderRadius: "40px", py: 1.25,
              fontWeight: 700, textTransform: "none", fontSize: "14px",
              minHeight: "46px", boxShadow: "none",
              "&:hover": { background: "#74ab35" },
            }}>
              Shop Now
            </Button>
            </Link>
            <Link href="/login" style={{ textDecoration: "none" }}>
              <Button fullWidth startIcon={<LoginRoundedIcon />} variant="contained" sx={{
                background: "#102048", borderRadius: "40px", py: 1.3,
                fontWeight: 700, textTransform: "none", boxShadow: "none",
                "&:hover": { background: "#08142e" },
              }}>
                Login
              </Button>
            </Link>
          </Box>
        </Box>
      </Drawer>
      {/* ═══════════════════════════ CART SIDE DRAWER ═════════════════════════ */}
      <Drawer
        anchor="right"
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        slotProps={{
          paper: {
            sx: {
              width: { xs: "100vw", sm: 420 },
              background: "#f7f8fa",
              display: "flex",
              flexDirection: "column",
            },
          },
        }}
      >
        {/* Header */}
        <Box sx={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          px: 3, py: 2.2,
          background: "#fff",
          borderBottom: "1px solid #eef2f7",
          flexShrink: 0,
        }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.4 }}>
            <ShoppingBagOutlinedIcon sx={{ color: "#102048", fontSize: 22 }} />
            <Typography sx={{ fontWeight: 800, fontSize: "18px", color: "#102048" }}>
              Your cart
            </Typography>
            {count > 0 && (
              <Box sx={{
                background: "#102048", color: "#fff",
                fontWeight: 800, fontSize: "11px",
                px: 1.2, py: 0.15, borderRadius: "20px", lineHeight: 1.7,
              }}>
                {count}
              </Box>
            )}
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Link href="/cart" style={{ textDecoration: "none" }}>
              <Typography
                onClick={() => setCartOpen(false)}
                sx={{
                  fontSize: "13px", fontWeight: 700, color: "#102048",
                  textDecoration: "underline", textUnderlineOffset: "3px",
                  cursor: "pointer",
                  "&:hover": { color: "#8BC53F" },
                }}
              >
                View cart
              </Typography>
            </Link>
            <IconButton
              onClick={() => setCartOpen(false)}
              size="small"
              sx={{ background: "#f3f4f6", "&:hover": { background: "#e5e7eb" } }}
            >
              <CloseRoundedIcon sx={{ fontSize: 18, color: "#333" }} />
            </IconButton>
          </Box>
        </Box>

        {/* ── Items / Empty state ── */}
        <Box sx={{ flex: 1, overflowY: "auto", px: 2.5, py: 2.5 }}>
          {cartItems.length === 0 ? (
            /* ── EMPTY STATE — properly padded, never touching edges ── */
            (<Box sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "calc(100vh - 200px)",   // fills drawer height minus header
              px: 4,                               // side breathing room
              py: 6,
              gap: 2,
              textAlign: "center",
            }}>
              <Box sx={{
                width: 88, height: 88,
                borderRadius: "24px",
                background: "#f0f4ff",
                display: "flex", alignItems: "center", justifyContent: "center",
                mb: 1,
              }}>
                <ShoppingBagOutlinedIcon sx={{ fontSize: 40, color: "#102048", opacity: 0.3 }} />
              </Box>
              <Typography sx={{ fontWeight: 800, fontSize: "17px", color: "#102048" }}>
                Your cart is empty
              </Typography>
              <Typography sx={{
                fontSize: "13px", color: "#9aa0af", lineHeight: 1.65,
                maxWidth: 240,
              }}>
                Looks like you haven't added anything yet. Browse our products and find something you love.
              </Typography>
              <Button
                onClick={() => { setCartOpen(false); router.push("/products"); }}
                variant="contained"
                sx={{
                  mt: 1,
                  background: "#102048",
                  borderRadius: "40px",
                  px: 4, py: 1.3,
                  fontWeight: 700,
                  textTransform: "none",
                  fontSize: "14px",
                  boxShadow: "0 8px 24px rgba(16,32,72,0.18)",
                  "&:hover": { background: "#08142e", transform: "translateY(-1px)", transition: "all 0.2s" },
                }}
              >
                Browse Products
              </Button>
              <Button
                onClick={() => setCartOpen(false)}
                sx={{
                  color: "#9aa0af",
                  textTransform: "none",
                  fontSize: "13px",
                  fontWeight: 600,
                  "&:hover": { background: "transparent", color: "#102048" },
                }}
              >
                Continue browsing
              </Button>
            </Box>)
          ) : (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              {cartItems.map((item) => {
                const disc = item.price > item.salePrice
                  ? Math.round(((item.price - item.salePrice) / item.price) * 100) : 0;
                return (
                  <Box
                    key={item.id}
                    sx={{
                      display: "flex", gap: 1.8,
                      background: "#fff",
                      borderRadius: "14px",
                      border: "1px solid #e8eaef",
                      p: "14px",
                      boxShadow: "0 1px 6px rgba(0,0,0,0.04)",
                    }}
                  >
                    {/* Thumbnail */}
                    <Box
                      onClick={() => { setCartOpen(false); router.push(`/products/${item.id}`); }}
                      sx={{
                        width: 82, height: 82, flexShrink: 0,
                        borderRadius: "10px", overflow: "hidden",
                        background: "#f8f9fb",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        p: 1, cursor: "pointer",
                        border: "1px solid #eef0f4",
                        "&:hover": { opacity: 0.85 },
                        transition: "opacity 0.15s",
                      }}
                    >
                      <img
                        src={proxyImage(item.image)}
                        alt={item.name}
                        style={{ width: "100%", height: "100%", objectFit: "contain" }}
                      />
                    </Box>

                    {/* Info */}
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography sx={{
                        fontSize: "9px", fontWeight: 800, color: "#8BC53F",
                        textTransform: "uppercase", letterSpacing: "1.5px", mb: 0.3,
                      }}>
                        {item.brand}
                      </Typography>
                      <Typography
                        onClick={() => { setCartOpen(false); router.push(`/products/${item.id}`); }}
                        sx={{
                          fontSize: "12.5px", fontWeight: 700, color: "#0d1526",
                          lineHeight: 1.4, mb: 1,
                          display: "-webkit-box", WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical", overflow: "hidden",
                          cursor: "pointer",
                          "&:hover": { textDecoration: "underline" },
                        }}
                      >
                        {item.name}
                      </Typography>

                      {/* Price */}
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.2 }}>
                        <Typography sx={{ fontWeight: 800, fontSize: "15px", color: "#0d1526" }}>
                          ₹{item.salePrice.toLocaleString("en-IN")}
                        </Typography>
                        {disc > 0 && (
                          <>
                            <Typography sx={{ fontSize: "11px", textDecoration: "line-through", color: "#bbb" }}>
                              ₹{item.price.toLocaleString("en-IN")}
                            </Typography>
                            <Box sx={{
                              background: "#fef2f2", border: "1px solid #fecaca",
                              color: "#dc2626", fontWeight: 800, fontSize: "9px",
                              px: 0.7, py: 0.1, borderRadius: "4px",
                            }}>
                              {disc}% OFF
                            </Box>
                          </>
                        )}
                      </Box>

                      {/* Qty + delete */}
                      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <Box sx={{
                          display: "flex", alignItems: "center",
                          border: "1.5px solid #e0e0e0", borderRadius: "8px",
                          overflow: "hidden", background: "#fafafa",
                        }}>
                          <IconButton
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            sx={{ borderRadius: 0, width: 30, height: 30, "&:hover": { background: "#f0f0f0" } }}
                          >
                            <RemoveRoundedIcon sx={{ fontSize: 13 }} />
                          </IconButton>
                          <Typography sx={{
                            px: 1.5, fontWeight: 800, fontSize: "13px",
                            color: "#0d1526", minWidth: 28, textAlign: "center",
                          }}>
                            {item.quantity}
                          </Typography>
                          <IconButton
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            sx={{ borderRadius: 0, width: 30, height: 30, "&:hover": { background: "#f0f0f0" } }}
                          >
                            <AddRoundedIcon sx={{ fontSize: 13 }} />
                          </IconButton>
                        </Box>

                        <IconButton
                          onClick={() => removeFromCart(item.id)}
                          size="small"
                          sx={{
                            color: "#bbb",
                            "&:hover": { color: "#dc2626", background: "#fef2f2" },
                            transition: "all 0.15s",
                          }}
                        >
                          <DeleteOutlineRoundedIcon sx={{ fontSize: 18 }} />
                        </IconButton>
                      </Box>
                    </Box>
                  </Box>
                );
              })}
            </Box>
          )}
        </Box>

        {/* ── Footer — only when cart has items, EMI removed ── */}
        {cartItems.length > 0 && (
          <Box sx={{
            px: 2.5, pb: 3, pt: 2,
            background: "#fff",
            borderTop: "1px solid #eef2f7",
            flexShrink: 0,
          }}>
            {/* Tax note */}
            <Typography sx={{ fontSize: "11px", color: "#999", mb: 2 }}>
              Tax included,{" "}
              <span style={{ textDecoration: "underline", cursor: "pointer" }}>shipping</span>
              {" "}calculated at checkout
            </Typography>

            {/* Checkout button */}
            <Button
              fullWidth
              variant="contained"
              onClick={() => { setCartOpen(false);

              // CHECK LOGIN

              const user = localStorage.getItem("user");

              if(!user){localStorage.setItem("redirectAfterLogin", "/checkout");

              router.push("/login");

            return;
          }

            // USER LOGGED IN
            router.push("/checkout");
          }}
              sx={{
                height: 52, borderRadius: "12px",
                background: "#0d1526",
                fontWeight: 800, fontSize: "15px",
                textTransform: "none",
                boxShadow: "0 8px 24px rgba(13,21,38,0.22)",
                transition: "all 0.2s",
                display: "flex", alignItems: "center", gap: 1,
                "&:hover": {
                  background: "#08101e",
                  boxShadow: "0 12px 32px rgba(13,21,38,0.32)",
                  transform: "translateY(-1px)",
                },
              }}
            >
              🛒 &nbsp; Checkout · ₹{total.toLocaleString("en-IN")}
            </Button>

            {/* View full cart link */}
            <Box sx={{ textAlign: "center", mt: 1.5 }}>
              <Link href="/cart" style={{ textDecoration: "none" }}>
                <Typography
                  onClick={() => setCartOpen(false)}
                  sx={{
                    fontSize: "12px", fontWeight: 700, color: "#667085",
                    textDecoration: "underline", textUnderlineOffset: "3px",
                    cursor: "pointer",
                    "&:hover": { color: "#102048" },
                  }}
                >
                  View full cart
                </Typography>
              </Link>
            </Box>
          </Box>
        )}
      </Drawer>
    </>
  );
}