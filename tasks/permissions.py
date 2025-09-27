# tasks/permissions.py
from rest_framework.permissions import BasePermission

class IsAdminOrRegistradorCreateOnly(BasePermission):
    """
    - Admin (superuser o is_staff) -> acceso total
    - Registrador (grupo 'registrador') -> solo POST en TblDatPerViewSet
    """

    def has_permission(self, request, view):
        user = request.user
        if not user or not user.is_authenticated:
            return False

        # admin
        if user.is_superuser or user.is_staff or user.groups.filter(name="admin").exists():
            return True

        # registrador solo POST al ViewSet de TblDatPer
        if user.groups.filter(name="registrador").exists():
            return request.method == "POST" and view.__class__.__name__ == "TblDatPerViewSet"

        return False
