# Recipes:

## Description

This package allows you to create recipes for home brew.

## **Recipe** Model

- **Title:** Title of Recipe
	- type : String
- **Description:** Description of Beer
	- type : String
- **Type:** Type of Beer
	- type : String
- **ABV:** Alcohol By Volume
	- type : Float (Percentage)
- **O.G.:** Original Gravity
	- type : Float
- **F.G.:** Final Gravity
	- type : Float
- **Stages:**
	- type : [ Stage ]
- **Instructions:**
	- type : String

## **Stage** Model

- **Name:** Name of stage
- **Ingredients:**
	- type : [ Ingredient ]
- **Notes:**
	- type : String

## **Ingredient** Model

- **Name:** Name of ingredient
- **Type:**
- **QTY:**
