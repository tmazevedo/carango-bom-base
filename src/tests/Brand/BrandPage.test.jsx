import React from 'react';
import { createMemoryHistory } from 'history';
import { MemoryRouter, Router } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import BrandPage from '../../pages/brand/BrandPage';
import { AlertContext } from '../../contexts/AlertContext';
import BrandService from '../../services/BrandService';
import brandList from './constant';

jest.mock('../../services/BrandService');

const history = createMemoryHistory();
const mockAlertState = { handleAlert: jest.fn() };
beforeEach(async () => {
  BrandService.List.mockResolvedValue(brandList);

  render(
    <AlertContext.Provider value={mockAlertState}>
      <Router history={history}>
        <BrandPage />
      </Router>
    </AlertContext.Provider>,
    { wrapper: MemoryRouter },
  );

  await screen.findByRole('grid');
});

describe('When I create a Brand Component', () => {
  describe('and the Columns rendered', () => {
    it('should expect Marca Column', () => {
      expect(screen.getByText('Marca')).toBeInTheDocument();
    });

    it('should expect Row to be in the document', () => {
      const { name } = brandList[0];
      expect(screen.getByText(name)).toBeInTheDocument();
    });
  });

  it('should call the brands list call', () => {
    expect(BrandService.List).toHaveBeenCalled();
  });

  describe('and the button Novo', () => {
    it('should expect button to be in the document', () => {
      const alterarButton = screen.getByText('Alterar');
      expect(alterarButton).toBeInTheDocument();
    });

    describe('and I click', () => {
      it('should have route /brands/novo/', () => {
        fireEvent.click(screen.getByText('Novo'));
        expect(history.location.pathname).toMatch('/marcas/novo');
      });
    });
  });

  describe('and the button Alterar', () => {
    it('should expect button to be in the document', () => {
      const alterarButton = screen.getByText('Alterar');
      expect(alterarButton).toBeInTheDocument();
    });

    describe('and I click', () => {
      it('should have route /marcas/editar/{id}', () => {
        const { id, name } = brandList[0];
        fireEvent.click(screen.getByText(name));
        fireEvent.click(screen.getByText('Alterar'));
        expect(history.location.pathname).toMatch(`/marcas/editar/${id}`);
      });
    });
  });

  describe('and the button Excluir', () => {
    it('should expect button to be in the document', () => {
      const excluirButton = screen.getByText('Excluir');
      expect(excluirButton).toBeInTheDocument();
    });

    describe('and I click a valid vehicle', () => {
      beforeEach(async () => {
        const { name } = brandList[0];
        fireEvent.click(screen.getByText(name));
        fireEvent.click(screen.getByText('Excluir'));
        await screen.findByText('Confirmar');
        await screen.findByText('Cancelar');
      });

      describe('and I click on Confirmar button', () => {
        beforeEach(() => {
          BrandService.Remove.mockResolvedValue({ status: 200 });
        });

        describe('and the return is 200', () => {
          it('should have removed the line from the grid', async () => {
            const { name } = brandList[0];
            const brandLine = screen.getByText(name);
            const confirmButton = await screen.findByText('Confirmar');
            fireEvent.click(confirmButton);
            await screen.findByRole('grid');

            expect(BrandService.Remove).toHaveBeenCalled();
            expect(brandLine).not.toBeInTheDocument();
            expect(mockAlertState.handleAlert).toHaveBeenCalledWith({
              status: 'success',
              message: 'Removido com sucesso.',
            });
          });
        });

        describe('and the return is 409', () => {
          beforeEach(() => {
            BrandService.Remove.mockResolvedValue({ status: 409 });
          });

          it('should alert and not remove the line from the grid', async () => {
            const { name } = brandList[0];
            const confirmButton = await screen.findByText('Confirmar');
            fireEvent.click(confirmButton);
            await screen.findByRole('grid');

            expect(BrandService.Remove).toHaveBeenCalled();
            expect(screen.getByText(name)).toBeInTheDocument();
            expect(mockAlertState.handleAlert).toHaveBeenCalledWith({
              status: 'error',
              message: 'Não pode deletar marca com carros associados.',
            });
          });
        });

        describe('and the return is 403', () => {
          beforeEach(() => {
            BrandService.Remove.mockResolvedValue({ status: 403 });
          });

          it('should alert and not remove the line from the grid', async () => {
            const { name } = brandList[0];
            const confirmButton = await screen.findByText('Confirmar');
            fireEvent.click(confirmButton);
            await screen.findByRole('grid');

            expect(BrandService.Remove).toHaveBeenCalled();
            expect(screen.getByText(name)).toBeInTheDocument();
            expect(mockAlertState.handleAlert).toHaveBeenCalledWith({
              status: 'error',
              message: 'Não foi possivel deletar a marca.',
            });
          });
        });
      });

      describe('and I click on Cancelar button', () => {
        it('should not remove the line from the grid', async () => {
          const { name } = brandList[0];
          const brandLine = screen.getByText(name);
          fireEvent.click(screen.getByText('Cancelar'));
          await screen.findByRole('grid');
          expect(brandLine).toBeInTheDocument();
        });
      });
    });

    describe('and I click an invalid vehicle', () => {
      beforeEach(async () => {
        const { name } = brandList.find((b) => b.id === 'badID');
        fireEvent.click(screen.getByText(name));
        fireEvent.click(screen.getByText('Excluir'));
        await screen.findByText('Confirmar');
        await screen.findByText('Cancelar');
      });

      describe('id', () => {
        it('should throw an error', async () => {
          const confirmButton = await screen.findByText('Confirmar');
          fireEvent.click(confirmButton);
          expect(mockAlertState.handleAlert).toHaveBeenCalledWith({
            status: 'error',
            message: 'Brand ID is not an integer',
          });
        });
      });
    });
  });
});
