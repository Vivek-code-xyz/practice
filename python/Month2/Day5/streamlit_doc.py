import streamlit as st
import pandas as pd


def load_overall_analysis(df):

    st.header("Total Funding")

    total = round(df['amount'].sum())

    st.metric("Total Funding", total)

    st.subheader("Top 10 Funded Startups")

    top_startups = df.groupby("startup")["amount"].sum().sort_values(ascending=False).head(10)

    st.dataframe(top_startups)


def load_startup_details(df, startup):

    st.title(startup + " Analysis")

    startup_df = df[df["startup"] == startup]

    total = startup_df["amount"].sum()

    st.metric("Total Funding", total)

    st.subheader("Funding Rounds")

    st.dataframe(startup_df)


def load_investor_details(df, investor):

    st.title(investor + " Analysis")

    investor_df = df[df["investors"].str.contains(investor)]

    total = investor_df["amount"].sum()

    st.metric("Total Investment", total)

    st.subheader("Startups Funded")

    st.dataframe(investor_df[["startup", "amount", "date"]])