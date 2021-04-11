import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Index from './Index';
import SupplyTable from './SupplyTable';
import SaleTable from './SaleTable';
import ProductionTable from './ProductionTable';
import ProductTable from './ProductTable';


import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";


const drawerWidth = 220;

const styles = theme => ({
    root: {
        display: "flex"
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 36
    },
    menuButtonIconClosed: {
        transition: theme.transitions.create(["transform"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        transform: "rotate(0deg)"
    },
    menuButtonIconOpen: {
        transition: theme.transitions.create(["transform"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        transform: "rotate(180deg)"
    },
    hide: {
        display: "none"
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: "nowrap"
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    drawerClose: {
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        overflowX: "hidden",
        width: theme.spacing.unit * 7 + 1,
        [theme.breakpoints.up("sm")]: {
            width: theme.spacing.unit * 9 + 1
        }
    },
    toolbar: {
        display: "flex",
        alignItems: "center",
        marginTop: theme.spacing.unit,
        justifyContent: "flex-end",
        padding: "0 8px",
        ...theme.mixins.toolbar
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3
    },
    grow: {
        flexGrow: 1
    }
});

class MiniDrawer extends React.Component {
    state = {
        open: false,
        anchorEl: null
    };

    handleDrawerOpen = () => {
        this.setState({ open: !this.state.open });
    };

    handleDrawerClose = () => {
        this.setState({ open: false });
    };

    handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
    };
    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    render() {
        const { classes, theme } = this.props;
        const { anchorEl } = this.state;
        const menu = [
            {
                label: 'Vendas',
                comp: <SaleTable />,
                to: '/sale',
                icon: 'fa fa-dollar'
            },
            {
                label: 'Insumos',
                comp: <SupplyTable />,
                to: '/supply',
                icon: 'fa fa-truck'
            },
            {
                label: 'Produção',
                comp: <ProductionTable />,
                to: '/production',
                icon: 'fa fa-industry'
            },
            {
                label: 'Produto',
                comp: <ProductTable />,
                to: '/product',
                icon: 'fa fa-product-hunt'
            }
        ];
        const open = Boolean(anchorEl);
        return (
            <Router>
                <div className={classes.root}>
                    <CssBaseline />
                    <AppBar
                        position="fixed"
                        className={classes.appBar}
                        fooJon={classNames(classes.appBar, {
                            [classes.appBarShift]: this.state.open
                        })}
                    >
                        <Toolbar disableGutters={true}>
                            <IconButton
                                color="inherit"
                                aria-label="Open drawer"
                                onClick={this.handleDrawerOpen}
                                className={classes.menuButton}
                            >
                                <MenuIcon
                                    classes={{
                                        root: this.state.open
                                            ? classes.menuButtonIconOpen
                                            : classes.menuButtonIconClosed
                                    }}
                                />
                            </IconButton>
                            <Typography
                                variant="h6"
                                color="inherit"
                                className={classes.grow}
                                noWrap
                            >
                                SIGO (Sistema Integrado de Gestão de Operação)
                            </Typography>

                        </Toolbar>
                    </AppBar>
                    <Drawer
                        variant="permanent"
                        className={classNames(classes.drawer, {
                            [classes.drawerOpen]: this.state.open,
                            [classes.drawerClose]: !this.state.open
                        })}
                        classes={{
                            paper: classNames({
                                [classes.drawerOpen]: this.state.open,
                                [classes.drawerClose]: !this.state.open
                            })
                        }}
                        open={this.state.open}
                    >
                        <div className={classes.toolbar} />
                        <List>
                            <ListItem >
                                <ListItemIcon>
                                </ListItemIcon>
                                <ListItemText primary="Módulo Indústrial" />
                            </ListItem>
                            {menu.map((element) =>
                                <Link to={element.to} >
                                    <ListItem button key={element.label} to={element.to} >
                                        <ListItemIcon>
                                            <i className={element.icon}></i>
                                        </ListItemIcon>
                                        <ListItemText primary={element.label} />
                                    </ListItem>
                                </Link>
                            )}
                        </List>
                    </Drawer>
                    <main className={classes.content}>
                        <div className={classes.toolbar} />

                        <Switch>
                            <Route exact path='/'>
                                    <Index />
                            </Route>    
                            {menu.map((element) => 
                                <Route exact path={element.to}>
                                    {element.comp}
                                </Route>    
                            )}
                        </Switch>
                    </main>
                </div>
            </Router>
        );
    }
}

MiniDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(MiniDrawer);
