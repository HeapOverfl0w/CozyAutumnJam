﻿// <auto-generated />
using System;
using API.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace API.Migrations
{
    [DbContext(typeof(DataContext))]
    partial class DataContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "6.0.1");

            modelBuilder.Entity("API.Persistence.AppUser", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("TEXT");

                    b.Property<int>("AccessFailedCount")
                        .HasColumnType("INTEGER");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("TEXT");

                    b.Property<string>("Email")
                        .HasMaxLength(256)
                        .HasColumnType("TEXT");

                    b.Property<bool>("EmailConfirmed")
                        .HasColumnType("INTEGER");

                    b.Property<bool>("LockoutEnabled")
                        .HasColumnType("INTEGER");

                    b.Property<DateTimeOffset?>("LockoutEnd")
                        .HasColumnType("TEXT");

                    b.Property<string>("NormalizedEmail")
                        .HasMaxLength(256)
                        .HasColumnType("TEXT");

                    b.Property<string>("NormalizedUserName")
                        .HasMaxLength(256)
                        .HasColumnType("TEXT");

                    b.Property<string>("PasswordHash")
                        .HasColumnType("TEXT");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("TEXT");

                    b.Property<bool>("PhoneNumberConfirmed")
                        .HasColumnType("INTEGER");

                    b.Property<Guid?>("PlayerDataId")
                        .HasColumnType("TEXT");

                    b.Property<string>("SecurityStamp")
                        .HasColumnType("TEXT");

                    b.Property<bool>("TwoFactorEnabled")
                        .HasColumnType("INTEGER");

                    b.Property<string>("UserName")
                        .HasMaxLength(256)
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasDatabaseName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasDatabaseName("UserNameIndex");

                    b.HasIndex("PlayerDataId");

                    b.ToTable("AspNetUsers", (string)null);
                });

            modelBuilder.Entity("API.Persistence.Craft", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<string>("Creator")
                        .HasColumnType("TEXT");

                    b.Property<string>("Data")
                        .HasColumnType("TEXT");

                    b.Property<bool>("IsForSale")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Name")
                        .HasColumnType("TEXT");

                    b.Property<Guid>("Owner")
                        .HasColumnType("TEXT");

                    b.Property<int>("PlacedX")
                        .HasColumnType("INTEGER");

                    b.Property<int>("PlacedY")
                        .HasColumnType("INTEGER");

                    b.Property<int>("Price")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.ToTable("Crafts");
                });

            modelBuilder.Entity("API.Persistence.MaterialData", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<int>("Bark")
                        .HasColumnType("INTEGER");

                    b.Property<int>("Barrel")
                        .HasColumnType("INTEGER");

                    b.Property<int>("BeerCan")
                        .HasColumnType("INTEGER");

                    b.Property<int>("BlackPaintCircle")
                        .HasColumnType("INTEGER");

                    b.Property<int>("BlackPaintStripe")
                        .HasColumnType("INTEGER");

                    b.Property<int>("BlackPaintTriangle")
                        .HasColumnType("INTEGER");

                    b.Property<int>("Bone")
                        .HasColumnType("INTEGER");

                    b.Property<int>("Bottle")
                        .HasColumnType("INTEGER");

                    b.Property<int>("Broom")
                        .HasColumnType("INTEGER");

                    b.Property<int>("Candle")
                        .HasColumnType("INTEGER");

                    b.Property<int>("Chair")
                        .HasColumnType("INTEGER");

                    b.Property<int>("CinderBlock")
                        .HasColumnType("INTEGER");

                    b.Property<int>("Corn")
                        .HasColumnType("INTEGER");

                    b.Property<int>("Feather")
                        .HasColumnType("INTEGER");

                    b.Property<int>("GooglyEyes")
                        .HasColumnType("INTEGER");

                    b.Property<int>("Hoodie")
                        .HasColumnType("INTEGER");

                    b.Property<int>("Metal")
                        .HasColumnType("INTEGER");

                    b.Property<int>("MetalPipe")
                        .HasColumnType("INTEGER");

                    b.Property<int>("OrangeLeaf")
                        .HasColumnType("INTEGER");

                    b.Property<int>("Overalls")
                        .HasColumnType("INTEGER");

                    b.Property<int>("PineCone")
                        .HasColumnType("INTEGER");

                    b.Property<int>("PitchFork")
                        .HasColumnType("INTEGER");

                    b.Property<int>("Pumpkin")
                        .HasColumnType("INTEGER");

                    b.Property<int>("PumpkinPie")
                        .HasColumnType("INTEGER");

                    b.Property<int>("RedLeaf")
                        .HasColumnType("INTEGER");

                    b.Property<int>("Rock")
                        .HasColumnType("INTEGER");

                    b.Property<int>("Rope")
                        .HasColumnType("INTEGER");

                    b.Property<int>("Scarf")
                        .HasColumnType("INTEGER");

                    b.Property<int>("Sheet")
                        .HasColumnType("INTEGER");

                    b.Property<int>("Skull")
                        .HasColumnType("INTEGER");

                    b.Property<int>("Stick")
                        .HasColumnType("INTEGER");

                    b.Property<int>("Straw")
                        .HasColumnType("INTEGER");

                    b.Property<int>("Sword")
                        .HasColumnType("INTEGER");

                    b.Property<int>("Tire")
                        .HasColumnType("INTEGER");

                    b.Property<int>("WhitePaintCircle")
                        .HasColumnType("INTEGER");

                    b.Property<int>("WhitePaintStripe")
                        .HasColumnType("INTEGER");

                    b.Property<int>("WhitePaintTriangle")
                        .HasColumnType("INTEGER");

                    b.Property<int>("WitchHat")
                        .HasColumnType("INTEGER");

                    b.Property<int>("WoodBoard")
                        .HasColumnType("INTEGER");

                    b.Property<int>("YellowLeaf")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.ToTable("MaterialData");
                });

            modelBuilder.Entity("API.Persistence.PlayerData", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<int>("HomeBackdrop")
                        .HasColumnType("INTEGER");

                    b.Property<bool>("IsSearchingWoods")
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("LastWoodsSearch")
                        .HasColumnType("TEXT");

                    b.Property<Guid?>("MaterialsId")
                        .HasColumnType("TEXT");

                    b.Property<int>("Money")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("MaterialsId");

                    b.ToTable("PlayerData");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRole", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("TEXT");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .HasMaxLength(256)
                        .HasColumnType("TEXT");

                    b.Property<string>("NormalizedName")
                        .HasMaxLength(256)
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasDatabaseName("RoleNameIndex");

                    b.ToTable("AspNetRoles", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("ClaimType")
                        .HasColumnType("TEXT");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("TEXT");

                    b.Property<string>("RoleId")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("ClaimType")
                        .HasColumnType("TEXT");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("TEXT");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.Property<string>("LoginProvider")
                        .HasColumnType("TEXT");

                    b.Property<string>("ProviderKey")
                        .HasColumnType("TEXT");

                    b.Property<string>("ProviderDisplayName")
                        .HasColumnType("TEXT");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("TEXT");

                    b.Property<string>("RoleId")
                        .HasColumnType("TEXT");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetUserRoles", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("TEXT");

                    b.Property<string>("LoginProvider")
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .HasColumnType("TEXT");

                    b.Property<string>("Value")
                        .HasColumnType("TEXT");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens", (string)null);
                });

            modelBuilder.Entity("API.Persistence.AppUser", b =>
                {
                    b.HasOne("API.Persistence.PlayerData", "PlayerData")
                        .WithMany()
                        .HasForeignKey("PlayerDataId");

                    b.Navigation("PlayerData");
                });

            modelBuilder.Entity("API.Persistence.PlayerData", b =>
                {
                    b.HasOne("API.Persistence.MaterialData", "Materials")
                        .WithMany()
                        .HasForeignKey("MaterialsId");

                    b.Navigation("Materials");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.HasOne("API.Persistence.AppUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.HasOne("API.Persistence.AppUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("API.Persistence.AppUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.HasOne("API.Persistence.AppUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
