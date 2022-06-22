import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

const ProtectedRoute = UseGuards(JwtAuthGuard);

export default ProtectedRoute;
