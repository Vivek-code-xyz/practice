import streamlit as st
import pandas as pd
import plotly.express as px

st.set_page_config(layout="wide")

# ---------------- LOAD DATA ---------------- #

@st.cache_data
def load_data():
    df = pd.read_csv("startup_cleaned.csv")
    df['date'] = pd.to_datetime(df['date'])
    df['year'] = df['date'].dt.year
    df['month'] = df['date'].dt.to_period("M").astype(str)
    df['investors'] = df['investors'].fillna("Undisclosed")
    return df

df = load_data()

st.title("🚀 Indian Startup Funding Dashboard")

menu = st.sidebar.selectbox(
    "Select Analysis",
    ["Startup POV","Investor POV","General Analysis"]
)

# =====================================================
# STARTUP POV
# =====================================================

if menu == "Startup POV":

    st.header("Startup Analysis")

    startup = st.selectbox(
        "Select Startup",
        sorted(df['startup'].unique())
    )

    startup_df = df[df['startup'] == startup]

    col1,col2,col3 = st.columns(3)

    col1.metric("Total Funding", round(startup_df['amount'].sum(),2))
    col2.metric("Funding Rounds", startup_df.shape[0])
    col3.metric("Unique Investors", startup_df['investors'].nunique())

    st.subheader("Funding Rounds")

    st.dataframe(
        startup_df[['date','round','investors','amount']]
        .sort_values("date",ascending=False)
    )

    st.subheader("Funding by Stage")

    stage_data = startup_df.groupby("round")['amount'].sum().reset_index()

    fig = px.bar(stage_data,x="round",y="amount")

    st.plotly_chart(fig,use_container_width=True)

    st.subheader("Location")

    st.write(startup_df['city'].unique())

    st.subheader("Similar Companies")

    sector = startup_df['vertical'].iloc[0]

    similar = df[df['vertical']==sector]['startup'].unique()[:10]

    st.write(similar)



# =====================================================
# INVESTOR POV
# =====================================================

elif menu == "Investor POV":

    st.header("Investor Analysis")

    investor = st.selectbox(
        "Select Investor",
        sorted(df['investors'].unique())
    )

    investor_df = df[df['investors'].str.contains(investor)]

    col1,col2 = st.columns(2)

    col1.metric("Total Investments",investor_df.shape[0])
    col2.metric("Total Amount Invested",round(investor_df['amount'].sum(),2))

    st.subheader("Recent Investments")

    recent = investor_df.sort_values("date",ascending=False).head(10)

    st.dataframe(recent[['startup','city','round','amount','date']])

    st.subheader("Biggest Investments")

    biggest = investor_df.sort_values("amount",ascending=False).head(10)

    st.dataframe(biggest[['startup','amount','round','date']])

    # sector pie
    st.subheader("Sector Preference")

    sector_data = investor_df['vertical'].value_counts().reset_index()

    fig = px.pie(sector_data,names="vertical",values="count")

    st.plotly_chart(fig,use_container_width=True)

    # stage pie
    st.subheader("Stage Preference")

    stage_data = investor_df['round'].value_counts().reset_index()

    fig = px.pie(stage_data,names="round",values="count")

    st.plotly_chart(fig,use_container_width=True)

    # city pie
    st.subheader("City Preference")

    city_data = investor_df['city'].value_counts().reset_index()

    fig = px.pie(city_data,names="city",values="count")

    st.plotly_chart(fig,use_container_width=True)

    # YoY graph
    st.subheader("YoY Investment Trend")

    yoy = investor_df.groupby("year")['amount'].sum().reset_index()

    fig = px.line(yoy,x="year",y="amount",markers=True)

    st.plotly_chart(fig,use_container_width=True)



# =====================================================
# GENERAL ANALYSIS
# =====================================================

else:

    st.header("Overall Funding Analysis")

    col1,col2,col3,col4 = st.columns(4)

    col1.metric("Total Funding",round(df['amount'].sum(),2))
    col2.metric("Max Funding",round(df['amount'].max(),2))
    col3.metric("Average Funding",round(df['amount'].mean(),2))
    col4.metric("Funded Startups",df['startup'].nunique())

    # MoM chart

    st.subheader("MoM Funding Trend")

    mom = df.groupby("month")['amount'].sum().reset_index()

    fig = px.line(mom,x="month",y="amount")

    st.plotly_chart(fig,use_container_width=True)

    # sector analysis

    st.subheader("Sector Analysis")

    sector = df.groupby("vertical")['amount'].sum().sort_values(ascending=False).head(10).reset_index()

    fig = px.pie(sector,names="vertical",values="amount")

    st.plotly_chart(fig,use_container_width=True)

    # city funding

    st.subheader("City Wise Funding")

    city = df.groupby("city")['amount'].sum().sort_values(ascending=False).head(10).reset_index()

    fig = px.bar(city,x="city",y="amount")

    st.plotly_chart(fig,use_container_width=True)

    # top startups

    st.subheader("Top Funded Startups")

    startups = df.groupby("startup")['amount'].sum().sort_values(ascending=False).head(10).reset_index()

    fig = px.bar(startups,x="startup",y="amount")

    st.plotly_chart(fig,use_container_width=True)

    # top investors

    st.subheader("Top Investors")

    investors = df.groupby("investors")['amount'].sum().sort_values(ascending=False).head(10).reset_index()

    fig = px.bar(investors,x="investors",y="amount")

    st.plotly_chart(fig,use_container_width=True)