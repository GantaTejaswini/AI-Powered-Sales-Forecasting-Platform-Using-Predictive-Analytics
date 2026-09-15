import json
from ai_models.lead_model import Lead
from ai_models.score_model import LeadScore
from ai_models.conversation_model import ConversationSummary
from ai_models.followup_model import FollowUpRecommendation
from utils.llm_client import ask_llm
from prompts.analysis_prompts import get_followup_prompt

def generate_followup(lead: Lead, score: LeadScore, conversation: ConversationSummary) -> FollowUpRecommendation:
    prompt = get_followup_prompt(lead, score, conversation)
    response = ask_llm(prompt)
    data = json.loads(response)
    return FollowUpRecommendation(**data)