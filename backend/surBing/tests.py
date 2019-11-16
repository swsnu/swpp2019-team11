from django.test import TestCase, Client
#from .models import surBing
from django.contrib.auth.models import User
from .models import Survey, Cart, Item, Response
import unittest
import json
# Create your tests here.
class SurBingTestCase(TestCase): 
    def test_token(self):
        # prepare client
        client = Client(enforce_csrf_checks=True)
        # normal case
        response = client.get('/api/token/')
        self.assertEqual(response.status_code, 204)
        # wrong type of request
        response = client.head('/api/token/')
        self.assertEqual(response.status_code, 405) 

    def test_user(self):
        client = Client()
        #signup test
        response = client.post('/api/signup/', json.dumps({'username':'jomjung', 'password':'1234', 'email':'qwerty@gmail.com'}), content_type='application/json')
        self.assertEqual(response.status_code, 201)
        #signup decode error
        response = client.post('/api/signup/', json.dumps({'userndame':'jomjung', 'password':'1234', 'email':'qwerty@gmail.com'}), content_type='application/json')
        self.assertEqual(response.status_code, 400)
        #signup existing username error
        response = client.post('/api/signup/', json.dumps({'username':'jomjung', 'password':'1234', 'email':'qwerty@gmail.com'}), content_type='application/json')
        self.assertEqual(response.status_code, 400)
        #signup bad request
        response = client.get('/api/signup/')
        self.assertEqual(response.status_code, 400)
        
        #signin test
        response = client.post('/api/login/', json.dumps({'username':'jomjung', 'password':'1234'}), content_type='application/json')
        self.assertEqual(response.status_code, 204)
        #signin decode error
        response = client.post('/api/login/', json.dumps({'userndame':'jomjung', 'password':'1234'}), content_type='application/json')
        self.assertEqual(response.status_code, 400)
        #signin no user
        response = client.post('/api/login/', json.dumps({'username':'jomjjang', 'password':'1234'}), content_type='application/json')
        self.assertEqual(response.status_code, 401)
        #signin bad request
        response = client.get('/api/login/')
        self.assertEqual(response.status_code, 400)
        """
        #surveys keyerror
        response = client.post('/api/survey/', json.dumps({ 
            'item': [{'title': 'Title', 'question_type': 'Subjective', 'response': [{ 'respondant_id': 1, 'content': 'Yes'}] }], 
            'tittle': 'SurveyTitle', 
            'upload_date': '2019/09/31', 
            'survey_start_date': '1999/03/15', 
            'survey_end_date': '2019/03/15', 
            'content': 'SurveyContent', 
            'respondant_count': 1 }), 
            content_type='application/json')
        self.assertEqual(response.status_code, 400)
        #item keyerror
        response = client.post('/api/survey/', json.dumps({ 
            'item': [{'title': 'Title', 'question_type': 'Subjective', 'response': [{ 'respondant_id': 1, 'content': 'Yes'}] }], 
            'tittle': 'SurveyTitle', 
            'upload_date': '2019/09/31', 
            'survey_start_date': '1999/03/15', 
            'survey_end_date': '2019/03/15', 
            'content': 'SurveyContent', 
            'respondant_count': 1 }), 
            content_type='application/json')
        self.assertEqual(response.status_code, 400)
        #response keyerror
        response = client.post('/api/survey/', json.dumps({ 
            'item': [{'title': 'Title', 'question_type': 'Subjective', 'response': [{ 'respondant_idd': 1, 'content': 'Yes'}] }], 
            'tittle': 'SurveyTitle', 
            'upload_date': '2019/09/31', 
            'survey_start_date': '1999/03/15', 
            'survey_end_date': '2019/03/15', 
            'content': 'SurveyContent', 
            'respondant_count': 1 }), 
            content_type='application/json')
        self.assertEqual(response.status_code, 400)
        #surveys
        response = client.post('/api/survey/', json.dumps({ 
            'item': [{'title': 'Title', 'question_type': 'Subjective', 'response': [{ 'respondant_id': 1, 'content': 'Yes'}] }], 
            'title': 'SurveyTitle', 
            'upload_date': '2019/09/31', 
            'survey_start_date': '1999/03/15', 
            'survey_end_date': '2019/03/15', 
            'content': 'SurveyContent', 
            'respondant_count': 1 }), 
            content_type='application/json')
        self.assertEqual(response.status_code, 201)
        """
        #survey bad request
        response = client.get('/api/survey/')
        self.assertEqual(response.status_code, 400)

        #survey+id not exist
        response = client.get('/api/survey/2/')
        self.assertEqual(response.status_code, 404)
        """
        #survey+id test
        response = client.get('/api/survey/1/')
        self.assertEqual(response.status_code, 404)
        """
        #survey+id bad request
        response = client.delete('/api/survey/1/')
        self.assertEqual(response.status_code, 400)

        #cart test
        response = client.get('/api/mycart/')
        self.assertEqual(response.status_code, 200)
        #cart bad request
        response = client.delete('/api/mycart/')
        self.assertEqual(response.status_code, 400)
        #cart post keyerror
        response = client.post('/api/mycart/', json.dumps({'surveyee_id': 1}), content_type='application/json')
        self.assertEqual(response.status_code, 400)
        #cart post not exist
        response = client.post('/api/mycart/', json.dumps({'id': 2}), content_type='application/json')
        self.assertEqual(response.status_code, 404)


        #signout bad request
        response = client.delete('/api/logout/')
        self.assertEqual(response.status_code, 400)
        #signout test
        response = client.get('/api/logout/')
        self.assertEqual(response.status_code, 204)

    
        


