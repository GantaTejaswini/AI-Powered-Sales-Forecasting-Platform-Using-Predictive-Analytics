from agents.state import SalesGenieState
from ai_models.lead_model import Lead
from ai_models.insight_model import CompanyInsight
from ai_models.score_model import LeadScore
from engines.outreach_engine import generate_outreach

def outreach_agent(state: SalesGenieState) -> dict:
    print("  [Outreach Agent] Generating personalised email...")
    lead = Lead(**state["lead"])
    insight = CompanyInsight(**state["insight"])
    score = LeadScore(**state["score"])
    email = generate_outreach(lead, insight, score)
    return {
        "email": email.model_dump(),
        "current_step": "outreach_complete"
    }