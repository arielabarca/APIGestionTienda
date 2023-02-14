package com.curso.curso.models;

import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;


@Entity
@Table(name = "articulos")
@ToString @EqualsAndHashCode
public class Articulos {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter @Setter @Column(name = "id")
    private Long id;

    @Getter @Setter @Column(name = "proveedor")
    private Long proveedor;

    @Getter @Setter @Column(name = "cantidad")
    private Integer cantidad;

    @Getter @Setter @Column(name = "descripcion")
    private String descripcion;

    @Getter @Setter @Column(name = "talle")
    private String talle;

    @Getter @Setter @Column(name = "costo")
    private Integer costo;

    @Getter @Setter @Column(name = "precio")
    private Integer precio;

}