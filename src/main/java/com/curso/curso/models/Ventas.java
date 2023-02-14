package com.curso.curso.models;

import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;


@Entity
@Table(name = "ventas")
@ToString @EqualsAndHashCode
public class Ventas {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter @Setter @Column(name = "nro-venta")
    private Long nroVenta;

    @Getter @Setter @Column(name = "id-articulo")
    private Long idArticulo;

    @Getter @Setter @Column(name = "fecha-venta")
    private Date fechaVenta;

    @Getter @Setter @Column(name = "usuario-venta")
    private String usuarioVenta;

    @Getter @Setter @Column(name = "descripcion")
    private String descripcion;

    @Getter @Setter @Column(name = "talle")
    private String talle;

    @Getter @Setter @Column(name = "precio-venta")
    private Integer precioVenta;

    @Getter @Setter @Column(name = "nro-factura")
    private Long nroFactura;

    @Getter @Setter @Column(name = "medio-pago")
    private String medioPago;

}