from __future__ import absolute_import

from .celery import app as celery_app  # noqa

__all__ = ['celery_app']