import * as React from "react";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

export const AppMenu = () => {

	return (
		<Navbar className="bg-body-tertiary" style={{ position: 'fixed', top: 0, width: '100%' }}>
			<Container fluid>
				<Navbar.Brand href="#home">Portal de noticias</Navbar.Brand>
				<Navbar.Toggle />
				<Navbar.Collapse className="justify-content-end">
					<Navbar.Text>
						<a href="/empresas">Empresas</a>
					</Navbar.Text>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};
